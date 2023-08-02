from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain.agents import AgentType
from langchain.llms import OpenAI
from fastapi.responses import JSONResponse
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

import os
from io import BytesIO
import base64 
import json

from pydantic import BaseModel

class CompanyRequest(BaseModel):
    company: str
class PluginNameRequest(BaseModel):
    plugin: str

os.environ["OPENAI_API_KEY"] = "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"
os.environ["SERPAPI_API_KEY"] = "bdf25f73214e5c3904ab8535302b94fc39c239430082e7f0a90829ad2d2f1743"

app = FastAPI()

app.add_middleware(
    CORSMiddleware, 
    allow_credentials=True, 
    allow_origins=["*"], 
    allow_methods=["*"], 
    allow_headers=["*"]
)


def get_competition_template(company):
  return """
      For the following query, respond in the following format:
      [{"market":"name", "competitors":[{"company":"value", "market_cap": "value"},{"company":"value", "market_cap": "value"},{"company":"value", "market_cap": "value"},{"company":"value", "market_cap": "value"}]}]

      If you do not know the answer, respond in the following format:, 
      {"market":"", "companies":[]}

      Think step by step.
      The output should always be in a valid json format
      Below is the query:
      query: what markets does """+company+""" compete in and what major its competitors in the market and what is its market cap in Billions
      """

def get_personailsed_email(company):
  return """
  For the following query, respond as follows:
  [{"email": "email_id", "name": "name", "subject":"subject", "email_content": "email_content"}]

  If you do not know the answer, respond as follows:
  [{}]
  Lets think step by step.
  Ensure you only give one name, email_id, subject, email_content
  email_id should follow the regex: r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
  email_content should contain the name of the person
  The output should always be a valid json
  Below is the query:
  query: can you get me a single name and email id of a top level excecutive at the company """+company+""" \
    and write a demo email introducing them to a new web plugin that uses ChatGPT to give market insights 
  """

def get_personailsed_tweets(plugin_name):
  return """ 
  For the following query, respond as follows:
  {"twitter_content": "tweet"}

  If you do not know the answer, respond as follows:
  {}
  Lets think step by step.
  The output should always be a valid json
  Ensure that you only give a single repsponse
  Ensure the response contains the plugin_name and the generated content and the hashtags
  Below is the query:
  query: can you generate a tweet and the necessary #/
    introducing them to a new web plugin """+plugin_name+"""  /
    be creative about the type of plugin it is based on the name
  """

@app.post('/market/')
def get_market_share_details(request: CompanyRequest):
  company = request.company
  llm = OpenAI(temperature=0.4)
  tools = load_tools(["serpapi"], llm=llm)
  agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, early_stopping_method="generate", verbose=True)
  competition = agent.run(get_competition_template(company))
  print(competition)
  json_obj = json.loads(competition)
  print(json_obj)
  return JSONResponse(json_obj)

@app.post('/email/')
def get_email_from_company(request: CompanyRequest):
  company = request.company
  llm = OpenAI(temperature=0.5)
  tools = load_tools(["serpapi"], llm=llm)
  agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, early_stopping_method="generate", verbose=True)
  email = agent.run(get_personailsed_email(company))
  print(email)
  json_obj = json.loads(email)
  print(json_obj)
  return JSONResponse(json_obj)

@app.post('/tweets/')
def get_email_from_company(request: PluginNameRequest):
  print("Ho")
  plugin_name = request.plugin
  llm = OpenAI(temperature=0.8)
  plugin = llm(get_personailsed_tweets(plugin_name))
  json_obj = json.loads(plugin)
  return JSONResponse(json_obj)