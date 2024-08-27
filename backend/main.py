import time
from termcolor import colored
from typing import List, Dict, Callable
from fastapi import FastAPI
from fastapi.responses import StreamingResponse, Response
from google.cloud import aiplatform
from vertexai.generative_models import (
    Content,
    FunctionDeclaration,
    GenerationConfig,
    GenerativeModel,
    Part,
    Tool,
)
import vertexai.preview.generative_models as generative_models
import multiprocessing
import asyncio
from payloads.chat_message import ChatRequest, ChatResponse, RestartChatRequest, RestartChatResponse, Request
from config import LocalSettings
from components.bqhelper import BQHelper
from components.prompthelper import PromptHelper
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Chat API", version="1.0.0")
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    app.local_settings = LocalSettings()
    
    print(f"ENV VARS=\n{app.local_settings}")
    app.state.prompthelper = PromptHelper(local_settings=app.local_settings)

    
    #initiate Vertex 
    aiplatform.init(project=app.local_settings.PROJECT_ID, location=app.local_settings.REGION)

    # function declaration
    get_vwap_ric = FunctionDeclaration(
    name="get_vwap_ric",
    description="""
    Get, Calculate or correlate the Best Average Price Weighted by Volume (VWAP)for one or more stock symbols (RIC) from Tick History data for a period of time.
    Identify the RICS based on the company names in.If you receieve more than one company then separate by comma
    If you don't receive a Company name then ALWAYS use Vodafone as default 
    The Period of time can be a month, quarter, week or day. 
    """,
    parameters={
        "type": "object",
        "properties": {
            "records": {
                "type": "array",
                "description": "A list of RICS ",
                "items": {
                    "description": "Data for RIC",
                    "type": "object",
                    "properties": {
                        "ric": {"type": "string", "description": "RICS to get VWAP for separated by comma"},
                        "start_date": {"type": "string", "description": "Start Date of the period, in the format of yyyy-MM-dd, e.g., 2023-05-20"},
                        "end_date": {"type": "string", "description": "End Date of the period, in the format of yyyy-MM-dd, e.g., 2023-05-21"},
                    },
                    "required": ["ric","start_date","end_date"],
                },
            },
        },
        "required": ["records"],
    },
    )

    get_mrn_ric = FunctionDeclaration(
    name="get_mrn_ric",
    description="""    
    Get, Calculate or correlate the News sentiment for one or more stock symbols (RIC) for a period of time.
    Identify the RICS based on the company names. If you receieve more than one company then separate by comma
    If you don't receive a Company name then ALWAYS use Vodafone as default 
    The Period of time can be month, quarter, week or day
    """,
    parameters={
        "type": "object",
        "properties": {
            "records": {
                "type": "array",
                "description": "A list of RICS ",
                "items": {
                    "description": "Data for RIC",
                    "type": "object",
                    "properties": {
                        "ric": {"type": "string", "description": "RICS to get VWAP for separated by comma"},
                        "start_date": {"type": "string", "description": "Start Date of the period, in the format of yyyy-MM-dd, e.g., 2023-05-20"},
                        "end_date": {"type": "string", "description": "End Date of the period, in the format of yyyy-MM-dd, e.g., 2023-05-21"},
                    },
                    "required": ["ric","start_date","end_date"],
                },
            },
        },
        "required": ["records"],
    },
    )


    get_msn_ric = FunctionDeclaration(
    name="get_msn_ric",
    description="""    
    Get, Calculate or correlate the Social media sentiment for one or more stock symbols (RIC) for a period of time.
    Identify the RICS based on the company names. If you receieve more than one company then separate by comma
    If you don't receive a Company name then ALWAYS use Vodafone as default 
    The Period of time can be month, quarter, week or day
    """,
    parameters={
        "type": "object",
        "properties": {
            "records": {
                "type": "array",
                "description": "A list of RICS ",
                "items": {
                    "description": "Data for RIC",
                    "type": "object",
                    "properties": {
                        "ric": {"type": "string", "description": "RICS to get VWAP for separated by comma"},
                        "start_date": {"type": "string", "description": "Start Date of the period, in the format of yyyy-MM-dd, e.g., 2023-05-20"},
                        "end_date": {"type": "string", "description": "End Date of the period, in the format of yyyy-MM-dd, e.g., 2023-05-21"},
                    },
                    "required": ["ric","start_date","end_date"],
                },
            },
        },
        "required": ["records"],
    },
    )


    get_esg_ric = FunctionDeclaration(
    name="get_esg_ric",
    description="""    
    Get, Calculate or correlate the ESG indicators for one or more stock symbols (RIC) for a period of time.
    Identify the RICS based on the company names. If you receieve more than one company then separate by comma
    If you don't receive a Company name then ALWAYS use Vodafone as default 
    The Period of time can be month, quarter, week or day
    """,
    parameters={
        "type": "object",
        "properties": {
            "records": {
                "type": "array",
                "description": "A list of RICS ",
                "items": {
                    "description": "Data for RIC",
                    "type": "object",
                    "properties": {
                        "ric": {"type": "string", "description": "RICS to get VWAP for separated by comma"},
                        "start_date": {"type": "string", "description": "Start Date of the period, in the format of yyyy-MM-dd, e.g., 2023-05-20"},
                        "end_date": {"type": "string", "description": "End Date of the period, in the format of yyyy-MM-dd, e.g., 2023-05-21"},
                    },
                    "required": ["ric","start_date","end_date"],
                },
            },
        },
        "required": ["records"],
    },
    )


    get_mes_ric = FunctionDeclaration(
    name="get_mes_ric",
    description="""    
    Get, Calculate or correlate Macroeconomic Indicators for one or more stock symbols (RIC) from Tick History data for a period of time.
    Identify the RICS based on the company names. If you receieve more than one company then separate by comma
    If you don't receive a Company name then ALWAYS use Vodafone as default 
    The Period of time can be month, quarter, week or day
    """,
    parameters={
        "type": "object",
        "properties": {
            "records": {
                "type": "array",
                "description": "A list of RICS ",
                "items": {
                    "description": "Data for RIC",
                    "type": "object",
                    "properties": {
                        "ric": {"type": "string", "description": "RICS to get VWAP for separated by comma"},
                        "start_date": {"type": "string", "description": "Start Date of the period, in the format of yyyy-MM-dd, e.g., 2023-05-20"},
                        "end_date": {"type": "string", "description": "End Date of the period, in the format of yyyy-MM-dd, e.g., 2023-05-21"},
                    },
                    "required": ["ric","start_date","end_date"],
                },
            },
        },
        "required": ["records"],
    },
    )
    # start tools 
    tools = Tool(
        function_declarations=[
            get_vwap_ric,
            get_mrn_ric,
            get_msn_ric,
            get_esg_ric,
            get_mes_ric,
        ]
    )
    
    system_instructions = app.state.prompthelper.get_system_instruction()
    # initialise the model 
    model = getChatModel(tool=tools,system_instructions=system_instructions)    
    app.state.model = model
    app.state.chats = {}
    app.state.bqClients = {}
    app.state.input_history = {}
    app.state.content_history = {}
    app.state.responses_history = {}

def get_or_create_chat(user_email):
    if user_email not in app.state.chats:
        app.state.chats[user_email] = app.state.model.start_chat(response_validation=False)
        print (f"creating new chat session: {user_email}")
    return app.state.chats[user_email]

def get_or_create_bq_client(user_email):
    if user_email not in app.state.bqClients:
        app.state.bqClients[user_email] = BQHelper(local_settings=app.local_settings)
    return app.state.bqClients[user_email]

def get_or_create_input_history(user_email):
    if user_email not in app.state.input_history:
        app.state.input_history[user_email] = []
    return app.state.input_history[user_email]

def get_or_create_content_history(user_email):
    if user_email not in app.state.content_history:
        app.state.content_history[user_email] = []
    return app.state.content_history[user_email]

def get_or_create_responses_history(user_email):
    if user_email not in app.state.responses_history:
        app.state.responses_history[user_email] = []
    return app.state.responses_history[user_email]

def build_previous_conversation_string(input_history, responses_history):
    previous_conversation_string = ""
    if len(responses_history) > 0:
        for iter, response in enumerate(responses_history):
            previous_conversation_string += f'user: {input_history[iter]}\ngenbeta: {response}' 
        
    print(colored(f'previous_conversation_string:\n{previous_conversation_string}', 'cyan'))
    return previous_conversation_string
    
@app.post(
    path = "/restartchat", 
    description="Restart Chat endpoint", 
    status_code=200)
async def restart_chat(payload: RestartChatRequest) -> RestartChatResponse:
    print(f"received restart chat request for user {payload}.")
    restart_chat_response_text = ""
    if payload.email in app.state.chats:
        del app.state.chats[payload.email]
        remaining_users = []
        for user in app.state.chats.keys():
            remaining_users.append(user) 
        restart_chat_response_text = f"{payload.email} found and removed from app.state.chats. Remaining users are {remaining_users}"
    else:
        restart_chat_response_text = f"{payload.email} not found in app.state.chats."
    print(restart_chat_response_text)
    restart_chat_response = RestartChatResponse(text=restart_chat_response_text)

    restart_input_history_response_text = ""
    if payload.email in app.state.input_history:
        del app.state.input_history[payload.email]
        restart_input_history_response_text = f"{payload.email} found and removed from app.state.input_history."
    else:
        restart_input_history_response_text = f"{payload.email} not found in app.state.input_history."
    print(restart_input_history_response_text)

    restart_content_history_response_text = ""
    if payload.email in app.state.content_history:
        del app.state.content_history[payload.email]
        restart_content_history_response_text = f"{payload.email} found and removed from app.state.content_history."
    else:
        restart_content_history_response_text = f"{payload.email} not found in app.state.content_history."
    print(restart_content_history_response_text)

    restart_responses_history_response_text = ""
    if payload.email in app.state.responses_history:
        del app.state.responses_history[payload.email]
        restart_responses_history_response_text = f"{payload.email} found and removed from app.state.responses_history."
    else:
        restart_responses_history_response_text = f"{payload.email} not found in app.state.responses_history."
    print(restart_responses_history_response_text)

    if payload.email in app.state.bqClients:
        del app.state.bqClients[payload.email]
        remaining_users = []
        for user in app.state.bqClients.keys():
            remaining_users.append(user) 
        restart_chat_response_text = f"{payload.email} found and removed from app.state.bqClients. Remaining users are {remaining_users}"
    else:
        restart_chat_response_text = f"{payload.email} not found in app.state.chats."
    
    return restart_chat_response

def getQueryVariables(user_prompt_content:list):
    """ Returns the RIC, StartDate and EndDate to query BQ. This is needed since we cannot serialize a list of protos for multi-threading. 
        Arguments: user_prompt_content -- a list of user_prompt_content object
        Returns: ric, start_date, end_date
    """
    # get start_date
    start_date = user_prompt_content[0].get("start_date")
    # get end_date
    end_date = user_prompt_content[len(user_prompt_content)-1].get("end_date")
    # get ric
    ric_part = ""
    ric_list= user_prompt_content[0].get("ric").split(",")
    for ric in ric_list:
        ric_part += "'" + ric.strip() + "',"
        
    # hack for ric
    ric_part += "''"
    # remove duplicates
    # rics = ' '.join(set(ric_part.split()))
    return ric_part,start_date,end_date


def default_proc():
   """ For processor to always have at least 2 processes"""
   print ("in process")

def add_context (sql_dict, chat_response):
    """ Add context to the chat response"""
    sql_queries = {}
    sql = ""
    for key, value in sql_dict.items():
        sql +=  value
        sql_queries["sql_query"] = sql
    chat_response.additional_context["text2sql_search_context"] = sql_queries

def get_totalrows(stats_dict):
    """ Returns the total rows from the BQ queries"""
    rows = 0
    for key, value in stats_dict.items():
        rows += int(value)
    return rows

def get_statistics(prompt_tokens, prompt, stats_dict):
    """ Returns the total Gemini Tokens as well as total BQ rows computed"""
    prompt_tokens += prompt        
    tokens = app.state.model.count_tokens(prompt_tokens)        
    total_tokens = f"{'{0:,}'.format(int(tokens.total_tokens))}"
    bq_rows = f"{'{0:,}'.format(int(get_totalrows(stats_dict)))}"
    return total_tokens,bq_rows

def getChatModel(tool:Tool, system_instructions) -> generative_models.GenerativeModel:
   """ returns the chat model for a given Model"""
   safety_settings = get_safety_settings()
   model= GenerativeModel(
        "gemini-1.5-pro-001",
        generation_config=GenerationConfig(temperature=0,max_output_tokens=8192,top_p=0.95), 
        tools=[tool],
        system_instruction=system_instructions,
        safety_settings=safety_settings,
    )
   return model

def get_safety_settings():
   """ returns the safety setting for a given Model"""
   safety_settings= {
        generative_models.HarmCategory.HARM_CATEGORY_HATE_SPEECH: generative_models.HarmBlockThreshold.BLOCK_NONE,
        generative_models.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: generative_models.HarmBlockThreshold.BLOCK_NONE,
        generative_models.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: generative_models.HarmBlockThreshold.BLOCK_NONE,
        generative_models.HarmCategory.HARM_CATEGORY_HARASSMENT: generative_models.HarmBlockThreshold.BLOCK_NONE,
    }
   return safety_settings

def stream_response(contents, statistics):
    """ Calls Vertex AI in Streaming mode for model responses. Used to produce reports that requires specific system instructions """

    responses = app.state.model.generate_content(contents, stream=True)  
    # get statistics
    #print ("===========>>>> GETTING VERTEX RESPONSE <<<<<================")
    for response in responses:
        if (response.candidates[0].finish_reason):
            yield statistics
            print (response.candidates[0].finish_reason)
        else:
            text_chunk = str(response.text)
            yield text_chunk

def stream_chat_response(chat,prompt, statistics):
    """ Calls Vertex AI in Streamig mode for chat responses. Used when user is having a conversation with the app. """
    responses =chat.send_message(prompt, stream=True)
    for response in responses:
        if (response.candidates[0].finish_reason):
            yield statistics
            print (response.candidates[0].finish_reason)
        try:
                text_chunk = str(response.text)
                yield text_chunk
        except ValueError as e:
            print (f"Something went wrong with the API call: {e}")
                # If the response doesn't contain text, check if the prompt was blocked.
            print(response.prompt_feedback)
            # Also check the finish reason to see if the response was blocked.
            print(response.candidates[0].finish_reason)
                # If the finish reason was SAFETY, the safety ratings have more details.
            print(response.candidates[0].safety_ratings)
            # raise Exception(f"Something went wrong with the API call: {e}")
            
def validate_email_domain(email:str):
    return email.endswith("@google.com") or email.endswith("altostrat.com")
                        
@app.post("/chat_stream")
async def chat_stream(request: Request, email: str ):

    if not (validate_email_domain(email)):
        return ("not_valid")

    messages = request.messages
    input = ""
    for message in messages:
        input = message.content
    t0=time.time()
    print(colored('***step0***', 'green'))
    print(f"payload.question=\n{input}")
    chat_response = ChatResponse
    chat_response.additional_context = {}
    # Get chat
    chat = get_or_create_chat(email)
    bqClient = get_or_create_bq_client(email)
    
    # re-start the temperature for function calling
    chat.generation_config=GenerationConfig(temperature=0,max_output_tokens=8192)
    gemini_response = chat.send_message(input)
    chat_response.text=""
    prompt = ""
    # variable to calculate total tokens
    prompt_tokens = app.state.prompthelper.get_system_instruction()
    
    t1=time.time()
    print(colored(f"***step1***\ntime={'{0:.4f}'.format(t1-t0)}\n", 'yellow'))
    if gemini_response.candidates[0].function_calls:
        # Extract function names and parameters
        parts =[]
        tasks = []
        result = None
        # iterate through the functions to call ours
        manager = multiprocessing.Manager()
        # Variables to save the multi-thread state of the functions
        return_dict = manager.dict()
        sql_dict = manager.dict()
        stats_dict = manager.dict()
        # Add default process
        p = multiprocessing.Process(target=default_proc)
        tasks.append(p)
        p.start()
        function_name = ""
        # get the variables to query BQ
        i = 0
        ric, start_date, end_date = getQueryVariables(gemini_response.candidates[0].function_calls[0].args.get("records"))
        for function_call in gemini_response.candidates[0].function_calls:
            # dict key needs to be hashable
            function_name = function_call.name 
            # Determine which API to call
            if function_name == "get_vwap_ric":
                # get the VWAP
                p = multiprocessing.Process(target=bqClient.get_vwap_bq, args=(ric,start_date,end_date,function_name,return_dict,sql_dict,stats_dict))
                tasks.append(p)
                p.start()        
                i += 1
            if function_name == "get_msn_ric":
                # get the MSN
                p = multiprocessing.Process(target=bqClient.get_msn_bq, args=(ric,start_date,end_date,function_name,return_dict,sql_dict,stats_dict))
                tasks.append(p)
                p.start()          
                i += 1
            if function_name== "get_mrn_ric":
                # get the MRN
                p = multiprocessing.Process(target=bqClient.get_mrn_bq, args=(ric,start_date,end_date,function_name,return_dict,sql_dict,stats_dict))
                tasks.append(p)
                p.start()          
                i += 1
            if function_name== "get_esg_ric":
                # get the ESG
                # p = multiprocessing.Process(target=bqClient.get_esg_indicators_bq, args=(ric,function_name,return_dict,sql_dict,stats_dict))
                # tasks.append(p)
                # p.start()
                p = multiprocessing.Process(target=bqClient.get_esg_summary_bq, args=(ric,function_name,return_dict,sql_dict,stats_dict))
                tasks.append(p)
                p.start()
                i += 1
            if function_name== "get_mes_ric":
                # get the ESG
                p = multiprocessing.Process(target=bqClient.get_mes_bq, args=(ric,start_date,end_date,function_name,return_dict,sql_dict,stats_dict))
                tasks.append(p)
                p.start()         
                i += 1
        # query BQ results in parallel
        for proc in tasks:
            proc.join()     

        # Add the parts from the process
        api_response = {}
        for key, value in return_dict.items():
            api_response[key] = value   
            # append the part to an array to be sent as Content    
            parts.append(Part.from_function_response(
                    name = key,
                    response = {"content": value,}
                ))
            # add the value to the token count
            prompt_tokens += value            
        
        # add additional conext
        add_context(sql_dict, chat_response)        
        
        t2=time.time()
        print(colored(f"***step2***\ntime={'{0:.4f}'.format(t2-t1)}\n", 'magenta'))
        chat.generation_config=GenerationConfig(temperature=0,max_output_tokens=8192,top_p=0.95)
        
        # validate that the call will require extensive system instructions
        if i > 3:
            # Create an array of content to Gemini so it can generate a model response or request another function call
            prompt = app.state.prompthelper.build_prompt(input, app.state.prompthelper.get_tasks_exec_summary())
            contents=[
                Content(role="user",
                    parts=[
                        Part.from_text(prompt),
                    ]
            ),
            # original function calling response
                gemini_response.candidates[0].content
            ,
            Content(role="user",
                    parts=parts
            ),
            ]
            # get statistics
            total_tokens, bq_rows =  get_statistics(prompt_tokens, prompt, stats_dict)
            statistics = app.state.prompthelper.append_statistics("0",total_tokens,bq_rows)
            return StreamingResponse(stream_response(contents, statistics), media_type='text/event-stream') 
        else:
            prompt = app.state.prompthelper.build_prompt(input, app.state.prompthelper.get_tasks_chat())
             # get statistics
            total_tokens, bq_rows =  get_statistics(prompt_tokens, prompt, stats_dict)
            statistics = app.state.prompthelper.append_statistics("0",total_tokens,bq_rows)
            return StreamingResponse(stream_chat_response(chat,prompt, statistics), media_type='text/event-stream') 
    else:
        print(colored('***step2***', 'blue'))
        response = Response(content= gemini_response.candidates[0].content.parts[0].text)
        print(colored('***step3 - end ***', 'green'))
        return response
