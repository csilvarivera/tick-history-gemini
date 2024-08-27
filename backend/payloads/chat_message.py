from pydantic import BaseModel, Field
from typing import List

class ChatRequest(BaseModel):
    persona: str | None = Field(
        default=None, 
        title="The persona using the bot",
        example="human"
    )   
    email: str | None = Field(
        default=None, 
        title="The user email using the app",
        example="human"
    )
    question: str | None = Field(
        default=None, 
        title="Your query to the bot.", 
        example= "Tell me about the Cymbal Bank new employee information"
    )
    message_history: list[dict] | None = Field(
        default=None, 
        title="List of dictionaries containing author and content. The order of the list is important as it shows message exhcange over time", 
        example=[
            {'author': 'human', 'content': 'Hello'}, 
            {'author': 'ai', 'content': "Hello, I am your personal virtual assistant. How can I help you?"}
        ]
    ) 

class ChatResponse(BaseModel):
    text: str | None = Field(
        default=None, 
        title="The response from the bot", 
        example= "I can help you by answering your questions."
    )
    additional_context: dict | None = Field(
        default=None, 
        title="Dict containing additional context from data sources", 
        example=""
    )

class RestartChatRequest(BaseModel):
    email: str | None = Field(
        default=None, 
        title="The user email using the app",
        example="human"
    )
    
class RestartChatResponse(BaseModel):
    text: str | None = Field(
        default=None, 
        title="The response from the restart chat api", 
        example= "chat restarted"
    )

class ClientMessage(BaseModel):
    role: str
    content: str

class Request(BaseModel):
    messages: List[ClientMessage]





# class SearchRequest(BaseModel):
#     input: str | None = Field(
#         default=None, 
#         title="Your query to the bot.", 
#         example= "Tell me about the company Cymbal bank"
#     )
#     history: list[dict] | None = Field(
#         default=None, 
#         title="List of dictionaries containing author and content. The order of the list is important as it shows message exhcange over time", 
#         example=[
#             {'author': 'human', 'content': 'Hello'}, 
#             {'author': 'ai', 'content': "Hello, I am your personal virtual assistant. How can I help you?"}
#         ]
#     ) 

# class SearchResponse(BaseModel):
#     text: str | None = Field(
#         default=None, 
#         title="The response from the bot", 
#         example= "I can help you by answering your questions."
#     )
#     additional_context: dict | None = Field(
#         default=None, 
#         title="Dict containing additional context from data sources", 
#         example=""
#     )


# class BQRequest(BaseModel):
#     persona: str | None = Field(
#         default=None, 
#         title="The persona using the bot",
#         example="sap"
#     )   
#     input: str | None = Field(
#         default=None, 
#         title="Your query to the bot.", 
#         example= "How many disconnected properties are there in the lad Lambeth?"
#     )
#     history: list[dict] | None = Field(
#         default=None, 
#         title="List of dictionaries containing author and content. The order of the list is important as it shows message exhcange over time", 
#         example=[
#             {'author': 'human', 'content': 'Hello'}, 
#             {'author': 'ai', 'content': "Hello, I am your personal virtual assistant. How can I help you?"}
#         ]
#     ) 

# class BQResponse(BaseModel):
#     text: str | None = Field(
#         default=None, 
#         title="The response from the bot", 
#         example= "I can help you by answering your questions."
#     )
#     sql_query: str | None = Field(
#         default=None, 
#         title="The executed SQL query", 
#         example="SELECT * FROM table_name;"
#     )
#     sql_query_result: str | None = Field(
#         default=None, 
#         title="The result executed SQL query", 
#         example="2"
#     )



# class PredictRequest(BaseModel):
#     parameters: dict | None = Field(
#         default=None, 
#         title="List of parameters to send to the model", 
#         example={
#             "uprn": "100070290309",
#             "blpu_current_state": "in use",
#             "longitude": -1.8773823,
#             "latitude": 52.5033235,
#             "postcode": "b6 5ue",
#             "country": "england",
#             "city": "birmingham",
#             "lad": "birmingham",
#             "lot_id": "35",
#             "cn_adsl_max_predicted_down": 15.87,
#             "cn_adsl_max_predicted_up": 1.09,
#             "cn_nga_max_predicted_down": 100.0,
#             "cn_nga_max_predicted_up": 10.0,
#             "cn_fibre_max_predicted_down": 0.0,
#             "cn_fibre_max_predicted_up": 0.0,
#             "cn_adsl_op_count": "1",
#             "cn_nga_op_count": "2",
#             "cn_fibre_op_count": "0",
#             "cn_technologies": "adsl,nga",
#             "gigabit_approved": "1",
#             "gigabit_under_review": "0",
#             "gigabit_unassessed": "0",
#             "gigabit_rejected": "0",
#             "subsidy_control_status": "gigabit grey"
#         }
#     )    
