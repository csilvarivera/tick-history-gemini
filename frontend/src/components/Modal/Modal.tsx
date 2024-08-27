"use client";

import React, { useState } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center z-z0 overflow-y-auto bg-black bg-opacity-50" >
      <div className="relative w-full max-w-md max-h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 justify-center" style={{width:"1200px"}}  >
          <div className="flex justify-end p-2">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="p-6 ">
            <h3>Full Instructions coming Soon! - refer to<a target="_blank" rel="noopener noreferrer" href="http://goto.google.com/market-insaights-demo-script"> go/market-insaights-demo-script</a></h3>
          <p style={{lineHeight:1.38,marginBottom:16,marginTop:0}} dir="ltr"><span style={{color:"#666666",fontFamily:'Arial',fontSize:15}}><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>Datasets for Demo in BigQuery</span></span></p>
          <ul style={{marginBottom:0, marginTop:0, paddingInlineStart:48}}>
          <li style={{color:'#000000',fontFamily:'Arial',fontSize:11,fontStyle:'normal',fontWeight:400,listStyleType:'disc',verticalAlign:'baseline',whiteSpace:'pre', }} ><span style={{color:'#000000',fontFamily:'Arial',fontSize:11,}}><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong>LSE Tick History</strong></span><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}> from Jan 2011 to July 2024</span></span></li>
              <li style={{color:'#000000',fontFamily:'Arial',fontSize:11,fontStyle:'normal',fontWeight:400,listStyleType:'disc',verticalAlign:'baseline',whiteSpace:'pre', }}><span style={{color:'#000000',fontFamily:'Arial',fontSize:11,}}><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong>Machine Readable News</strong></span><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>from Jan 2011 to Dec 2024</span></span></li>
              <li style={{color:'#000000',fontFamily:'Arial',fontSize:11,fontStyle:'normal',fontWeight:400,listStyleType:'disc',verticalAlign:'baseline',whiteSpace:'pre', }}><span style={{color:'#000000',fontFamily:'Arial',fontSize:11,}}><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong>MarketPsych Social Media Indicators</strong></span><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>from</span><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong></strong></span><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>Jan 2011 to June 2024</span></span></li>
              <li style={{color:'#000000',fontFamily:'Arial',fontSize:11,fontStyle:'normal',fontWeight:400,listStyleType:'disc',verticalAlign:'baseline',whiteSpace:'pre', }}><span style={{color:'#000000',fontFamily:'Arial',fontSize:11,}}><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong>MarketPsych MacroEconomic Indicators</strong></span><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>from</span><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong></strong></span><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>Jan 2011 to June 2024</span></span></li>
              <li style={{color:'#000000',fontFamily:'Arial',fontSize:11,fontStyle:'normal',fontWeight:400,listStyleType:'disc',verticalAlign:'baseline',whiteSpace:'pre', }}><span style={{color:'#000000',fontFamily:'Arial',fontSize:11,}}><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong>MarketPsych ESG Indicators</strong></span><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}> from</span><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong></strong></span><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>Jan 2011 to June 2024</span></span></li>
          </ul>
          <p><span style={{color:"#666666",fontFamily:'Arial',fontSize:15,}}><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>Sample Demo Flow</span></span></p>
          <p style={{lineHeight:1.38,marginBottom:0,marginTop:0,}} dir="ltr"><span style={{color:"#ff0000",fontFamily:'Arial',fontSize:11,}}><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong>Important:</strong></span></span><span style={{color:'#000000',fontFamily:'Arial',fontSize:11,}}><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>If you receive an “Internal Error”, just try the prompt again or click on the “Clear Chat Button”. This is most likely due to the cloud run backend service being in warm up mode when the prompt was received, which prevents the functions from being called.</span></span></p>
          <p style={{lineHeight:1.38,marginBottom:0,marginTop:0,}} dir="ltr"><span style={{color:"#ff0000",fontFamily:'Arial',fontSize:11,}}><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong>Additionally</strong></span></span><span style={{color:'#000000',fontFamily:'Arial',fontSize:11,}}><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}> - remember to clear the chat and try again prompt1 or Long Prompt when needed</span></span></p>
          <p style={{lineHeight:1.38,marginBottom:0,marginTop:0,}} dir="ltr"></p>
          <p style={{lineHeight:1.38,marginBottom:0,marginTop:0,}} dir="ltr"><span style={{color:"#434343",fontFamily:"Roboto",fontSize:10,}}><i><span style={{fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>Prompt1 :</span></i><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}></span><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong>Hello how can you help?</strong></span><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}></span></span></p>
          <p style={{lineHeight:1.38,marginBottom:0,marginTop:0,}} dir="ltr"><span style={{color:"#434343",fontFamily:"Roboto",fontSize:10,}}><i><span style={{fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>Prompt2: </span></i><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong>Provide the Best Average Price by Volume for Unilever in the first week of February 2023 - 20 seconds : Click on Show Query - feel free to change company (i.e. Vodafone) and period</strong></span></span></p>
          <p style={{lineHeight:1.38,marginBottom:0,marginTop:0,}} dir="ltr"><span style={{color:"#434343",fontFamily:"Roboto",fontSize:10,}}><i><span style={{fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>Prompt3: </span></i><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong>now correlate the price against the social media scores for the same period -  20 seconds</strong></span></span></p>
          <p style={{lineHeight:1.38,marginBottom:0,marginTop:0,}} dir="ltr"><span style={{color:"#434343",fontFamily:"Roboto",fontSize:10,}}><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong>[optional - Long Demo Flow preferred]</strong></span></span></p>
          <p style={{lineHeight:1.38,marginBottom:0,marginTop:0,}} dir="ltr"><span style={{color:"#434343",fontFamily:"Roboto",fontSize:10,}}><i><span style={{fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>Prompt3: “<strong>What about the macroeconomic indicators for the same period?</strong></span></i><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong>” - 15 seconds Click on Show query</strong></span></span></p>
          <p style={{lineHeight:1.38,marginBottom:0,marginTop:0,}} dir="ltr"><span style={{color:"#666666",fontFamily:'Arial',fontSize:15,}}><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>Long Demo Flow</span></span></p>
          <p style={{lineHeight:1.38,marginBottom:0,marginTop:0,}} dir="ltr"><span style={{color:"#434343",fontFamily:"Roboto",fontSize:10,}}><i><span style={{fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>Prompt1: </span></i><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>“</span><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong>Hello how can you help?</strong></span><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}></span></span></p>
          <p style={{lineHeight:1.38,marginBottom:0,marginTop:0,}} dir="ltr"><span style={{color:"#434343",fontFamily:"Roboto",fontSize:10,}}><i><span style={{fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>Prompt2: </span></i><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}>“</span><span style={{fontStyle:'normal',verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong>please provide a news sentiment and the social media sentiment for two Securities in this case is Vodafone and BT for the first Quarter of 2022 and correlate against the best Average Price Weighted by Volume and Macroeconomic indicators.</strong></span><span style={{fontStyle:'normal',fontWeight:400,verticalAlign:'baseline',whiteSpace:"pre-wrap",}}><strong> - 4 Minutes for </strong></span></span></p>
                <img
                src={'/images/cloud-logo.png'}  style={{  margin: '0 20px 0 0'}}
              alt="Modal Image"
              className="w-48 h-48 mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
