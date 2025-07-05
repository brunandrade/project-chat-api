# 🧠 Assistente de Projetos com FastAPI + LangChain + LlamaCpp

Este projeto é um assistente inteligente que responde perguntas sobre projetos a partir de uma base `.csv`, usando modelos locais com `llama-cpp-python`, embeddings com HuggingFace e recuperação de contexto com LangChain.

---

## ✅ Pré-requisitos

Antes de tudo, instale:

- **Python 3.10 ou superior**
- **Modelo \*\***\`\`\***\* (ex: mistral.gguf)** compatível com `llama-cpp-python`
- [**CMake**](https://cmake.org/download/) e compilador C/C++ (recomendado: `MSVC` no Windows)
- **Docker** (caso deseje rodar em contêiner)
- Arquivo `projects.csv` deve estar em `backend/data/`

## 📦 Instalação do ambiente Python

1. Crie e ative um ambiente virtual:

```bash
python -m venv .venv
.venv\Scripts\activate     # Windows
# source .venv/bin/activate    # Linux/macOS
```

2. Instale as dependências:

```bash
pip install -r requirements.txt
```

> 💡 Se estiver usando `llama-cpp-python`, certifique-se que o CMake esteja instalado e configurado corretamente.

## 📄 Estrutura do Projeto

```
backend-ia/
├── main.py                  # Código da API FastAPI
├── data/
│   └── projects.csv         # Base de dados com projetos
├── models/
│   └── mistral.gguf         # Modelo LLM local em formato .gguf
├── requirements.txt         # Dependências Python
```

## 🧠 Usando LlamaCpp com modelo local

Certifique-se de que o modelo `.gguf` está em `./models/`.

No código, o modelo é carregado com:

```python
llm = LlamaCpp(
    model_path="./models/mistral.gguf",
    temperature=0.7,
    max_tokens=512,
    top_p=0.95,
    n_ctx=2048,
    verbose=True,
)
```

## 🚀 Executando a API com Uvicorn

Execute o servidor FastAPI:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

A API ficará disponível em:\
📍 [http://localhost:8000](http://localhost:8000)\
📘 Swagger: [http://localhost:8000/docs](http://localhost:8000/docs)

## 💬 Exemplo de uso da API

**POST /api/v1/chat**

```json
{
  "pergunta": "Quais projetos estão com status concluído?"
}
```

**Resposta:**

```json
{
  "resposta": "O projeto FitLife está com status concluído"
}
```

## 🐳 Docker (opcional)

Se quiser rodar com Docker, veja o `dockerfile`:

```
docker build -f backend-ia.dockerfile -t backend-ia .
```

---
