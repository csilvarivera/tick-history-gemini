import logging
from typing import Any
from pydantic import BaseModel
import pandas as pd
import bigframes.pandas as bf
from config import LocalSettings
import google.cloud.bigquery.client as bigquery

import asyncio


class BQHelper(BaseModel):

    local_settings: LocalSettings()

    
    def __init__(self, **data: Any):
        super().__init__(**data)
        self.set_up()

    def set_up(self):
        print('Setting up BQHelper with variables')
        print(self.local_settings)

        print("****")

    def get_vwap_bq(self, rics, start_date, end_date, function_name,return_dict,sql_dict,stats_dict):
        """Retrieves the vwap for 1 or more RICS on a specified date."""

        # construct the query
        query = ("""
        ### Obtain VWAP for RIC
        WITH AllTrades AS(
            SELECT Date_Time,RIC,Price,Volume, Ask_Price,Ask_Size,Bid_Price,Bid_Size
            FROM `{0}.{1}.{2}`
            WHERE Price IS NOT NULL
            -- Specific Date/Time range:
            AND (Date_Time BETWEEN "{3} 12:00:00.000000" AND "{4} 12:59:59.999999")
            AND Type = "Trade"
            AND VOLUME > 0
            AND PRICE > 0
            -- All trades reported as "On Book" & "Regular Trades"
            -- This is according to the FIX specs, most European trading venues adhere to this
            AND RIGHT(REGEXP_EXTRACT(Qualifiers, r";(.*)\[MMT_CLASS\]"),14) LIKE "12%"
            )
        SELECT CAST (extract(DATE FROM Date_Time) AS STRING) AS date_time, RIC, ROUND(SAFE_DIVIDE(SUM(Volume*Price),SUM(Volume)),3) AS VWAP,SUM(Volume) AS TotalVolume,AVG(Price) AS Price,
        COUNT(RIC) AS NumTrades, MAX(Ask_Price) AS AskPrice,MAX(Ask_Size) as AskSize,
         MAX(Bid_Price) AS BidPrice, MAx(Bid_Size) AS BidSize
        FROM AllTrades
        WHERE RIC IN ({5})
        GROUP BY RIC, date_time
        ORDER BY 1,2
        """.format(self.local_settings.PROJECT_ID,self.local_settings.DATASET_NAME,self.local_settings.TH_TABLE_NAME,start_date,end_date, rics)) 
        
        print (f"getting VWAP for {rics} from {start_date} to {end_date}")
        
        bq_client =  bigquery.Client(self.local_settings.PROJECT_ID)
        query_job =  bq_client.query(query)
        rows = query_job.result()
        pd = rows.to_dataframe()

        sql_dict[function_name]=query
        # get stats
        self.get_tick_stats(rics,start_date,end_date,stats_dict,bq_client)
        return_dict[function_name] = pd.to_json()           

    def get_mrn_bq(self, rics, start_date, end_date, function_name,return_dict,sql_dict,stats_dict):
        """Retrieves the News for 1 or more RICS on a specified date."""
       
        # construct the query
        query = ("""
            ### Obtain MRN for RIC
            SELECT RIC, data.headline, data.body, data.pubStatus, _created AS Date
            FROM `{0}.{1}.MRN_UNLIMITED_CLUSTER`
            WHERE DATE(partition_date) >= DATE('{2}')
            AND DATE(partition_date) <= DATE('{3}')
            AND data.pubStatus <> 'stat:canceled'
            -- Filter by RIC
            AND UPPER(RIC ) IN( {4})
            AND data.body IS NOT NULL   
            AND RIC NOT IN ('')
            --LIMIT 200
            """.format(self.local_settings.PROJECT_ID,self.local_settings.DATASET_NAME,start_date,end_date, rics)) 
        print (f"getting MRN for {rics} from {start_date} to {end_date}")
        
        bq_client =  bigquery.Client(self.local_settings.PROJECT_ID)
        query_job =  bq_client.query(query)
        rows = query_job.result()
        pd = rows.to_dataframe()

        sql_dict[function_name]=query
        stats_dict["mrn_rows"] = len(pd.index)

        return_dict[function_name]=pd.to_json() 

        
    def get_msn_bq(self, rics, start_date, end_date, function_name,return_dict,sql_dict,stats_dict):
        """Retrieves the News for 1 or more RICS on a specified date."""

        # construct the query
        query = ("""
            ### Obtain Social Media and Litigation scores for RIC
             SELECT B.ric, windowDate AS Date, mentions,buzz,sentiment,negative,positive,optimism,pessimism,joy,surprise, trust, earningsForecast, analystRating,innovation,litigation,productSentiment
            FROM `{0}.marketpsych.WDAI_UDAI_PARTITION` p
            JOIN `{0}.marketpsych.MI_Companies_BASIC`  b ON p.ticker = b.Ticker
            WHERE b.RIC IN ({3})
            AND windowDate >= "{1}"
            AND windowDate <= "{2}"
            AND dataType = "News_Social"
            ORDER BY ric, windowDate DESC;
                """.format(self.local_settings.PROJECT_ID,start_date,end_date, rics))
        print (f"getting MNS for {rics} from {start_date} to {end_date}")
        
        bq_client =  bigquery.Client(self.local_settings.PROJECT_ID)
        query_job =  bq_client.query(query)
        rows = query_job.result()
        pd = rows.to_dataframe()

        sql_dict[function_name]=query
        stats_dict["msn_rows"] = len(pd.index)
        return_dict[function_name] =  pd.to_json() 
    
    def get_esg_indicators_bq(self, rics, function_name,return_dict,sql_dict,stats_dict):
        """Retrieves the ESG indicators for 1 or more RICS on a specified date."""

        # construct the query
        query = ("""
           SELECT  RIC,i.Pillar,i.CatItem_Desc as Category, i.title as Indicator, Value_ AS IndicatorValue, ValueScore as IndicatorScore
        FROM (
            SELECT RIC,Item, Value_, ValueScore, FY
            FROM `{0}.lseg_esg.esg_Environmental_Indicators` 
            UNION ALL
            SELECT RIC,Item, Value_, ValueScore, FY
            FROM `{0}.lseg_esg.esg_Governance_Indicators` 
            UNION ALL
            SELECT RIC,Item, Value_, ValueScore, FY
            FROM `{0}.lseg_esg.esg_Social_Indicators` 
            UNION ALL
            SELECT RIC,Item, Value_, ValueScore, FY
            FROM `{0}.lseg_esg.esg_Environmental` 
            UNION ALL
            SELECT RIC,Item, Value_, ValueScore, FY
            FROM `{0}.lseg_esg.esg_Social` 
            UNION ALL
            SELECT RIC,Item, Value_, ValueScore, FY
            FROM `{0}.lseg_esg.esg_Governance`
        )sei
        JOIN `{0}.lseg_esg.esg_Items` i on sei.Item = i.item
        WHERE RIC IN ({1})
        ORDER BY 1,2;
                """.format(self.local_settings.PROJECT_ID, rics))
        print (f"getting ESG indicators_for {rics} ")

        bq_client =  bigquery.Client(self.local_settings.PROJECT_ID)
        query_job =  bq_client.query(query)
        rows = query_job.result()
        pd = rows.to_dataframe()

        sql_dict[function_name]=query
        stats_dict["esg_indicator_rows"] = len(pd.index)
        return_dict[function_name] =  pd.to_json() 

    def get_esg_summary_bq(self, rics, function_name,return_dict,sql_dict,stats_dict):
        """Retrieves the ESG indicators for 1 or more RICS on a specified date."""

        # construct the query
        query = ("""
            SELECT RIC,i.Pillar, i.title,i.Description, value_ as summaryValue,valueGrade as SummaryGrade, FY as Year
            FROM `{0}.lseg_esg.esg_Items` i
            JOIN `{0}.lseg_esg.esg_Summary_Scores` s on s.item = i.item
            WHERE RIC IN ({1})
            and i.title not in ('ESG Controversies Score')
            ORDER BY 1,2;
                """.format(self.local_settings.PROJECT_ID, rics))
        print (f"getting ESG summary for {rics} ")

        bq_client =  bigquery.Client(self.local_settings.PROJECT_ID)
        query_job =  bq_client.query(query)
        rows = query_job.result()
        pd = rows.to_dataframe()

        sql_dict[function_name]=query
        stats_dict["esg_summary_rows"] = len(pd.index)
        return_dict[function_name] =  pd.to_json() 
    
    def get_mes_bq(self, rics, start_date, end_date, function_name,return_dict,sql_dict,stats_dict):
        """Retrieves the Macro Economic indicators to correlate with  1 or more RICS on a specified date.
        TODO: get the relevant countries dynamically depending on the prompt from the user. Defaulting to GB and US for now
        """

        # construct the query
        query = ("""
            ### Obtain Macro Economic indicators for RIC
            SELECT windowDate, AssetCode as Country, inflation, inflationForecast, economicGrowth, unemployment 
            FROM `csilvariverademo.marketpsych.WDAI_UDAI_COU_PARTITION` p 
            WHERE windowDate >= "{0}"
            AND windowDate <= "{1}" 
            AND assetCode IN ("GB", "US")
            ORDER BY windowDate DESC
            """.format(start_date,end_date))
        print (f"getting MES for {rics} from {start_date} to {end_date}")
        
        bq_client =  bigquery.Client(self.local_settings.PROJECT_ID)
        query_job =  bq_client.query(query)
        rows = query_job.result()
        pd = rows.to_dataframe()

        # bq_df = bf.read_gbq(query)
        # # save the dataframe as pandas
        # pd = bq_df.to_pandas()
        # save query and return dataframe
        sql_dict[function_name]=query
        stats_dict["mes_rows"] = len(pd.index)
        return_dict[function_name] =  pd.to_json() 
    
    def get_tick_stats(self, rics, start_date, end_date, stats_dict,bq_client):
        """Retrieves the total records read from TH."""

        #construct the query
        query = ("""
           SELECT Count(1)AS th_rows ,1 AS def
           FROM `{0}.{1}.{2}`
            WHERE Price IS NOT NULL
            -- Specific Date/Time range:
            AND (Date_Time BETWEEN "{3} 12:00:00.000000" AND "{4} 12:59:59.999999")
            AND Type = "Trade"
            AND VOLUME > 0
            AND PRICE > 0
            # All trades reported as "On Book" & "Regular Trades"
            # This is according to the FIX specs, most European trading venues adhere to this
            # This is according to the FIX specs, most European trading venues adhere to this
            AND RIGHT(REGEXP_EXTRACT(Qualifiers, r";(.*)\[MMT_CLASS\]"),14) LIKE "12%"
            AND RIC IN ({5})
            """.format(self.local_settings.PROJECT_ID,self.local_settings.DATASET_NAME,self.local_settings.TH_TABLE_NAME,start_date,end_date, rics)) 
        print (f"getting stats for {rics} from {start_date} to {end_date}")
        # bq_df = bf.read_gbq(query)
        # # save the dataframe as pandas
        # pd = bq_df.to_pandas()
        query_job =  bq_client.query(query)
        rows = query_job.result()
        pd = rows.to_dataframe()
        stats_dict["th_rows"] = pd['th_rows'].to_string(index=False)