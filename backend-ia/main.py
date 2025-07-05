from fastapi import FastAPI
from pydantic import BaseModel
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain_community.llms import LlamaCpp
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.schema import Document
from langchain.prompts import PromptTemplate
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI(
    title="project-chat-test-api",
    description="API que responde perguntas sobre projetos usando LangChain e embeddings.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df = pd.read_csv("./data/projects.csv")
docs = [Document(page_content=f"""
Projeto: {row['nome']}
Descrição: {row['descricao']}
Status: {row['status']}
Responsável: {row['responsavel']}
""".strip()) for _, row in df.iterrows()]

embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
db = Chroma.from_documents(docs, embedding_model)

# LLM - usando arquivo local .gguf do mistral
llm = LlamaCpp(
    model_path="./models/mistral.gguf", 
    temperature=0.7,
    max_tokens=512,
    top_p=0.95,
    n_ctx=2048,
    verbose=True,
)

# Memória de conversa
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

template = """Você é um assistente que responde sempre em português. Use o contexto abaixo para responder a pergunta.

Contexto:
{context}

Histórico:
{chat_history}

Pergunta:
{question}

Resposta em português:"""

prompt = PromptTemplate.from_template(template)

# Cadeia conversacional
chat = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=db.as_retriever(),
    memory=memory,
    combine_docs_chain_kwargs={"prompt": prompt}
)

# Endpoint
class Question(BaseModel):
    pergunta: str

@app.post("/api/v1/chat")
def perguntar(pergunta: Question):
    resposta = chat.invoke(pergunta.pergunta)
    return {"resposta": resposta["answer"].strip()}
