This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
backend-ia/
├── main.py                  # Código da API FastAPI
├── data/
│   └── projects.csv         # Base de dados com projetos
├── models/
│   └── mistral.gguf         # Modelo LLM local em formato .gguf
├── requirements.txt         # Dependências Python
```

---

## 🖥️ Frontend (Next.js + React)

O frontend é uma aplicação web moderna construída com Next.js e React, responsável pela interface de interação com o assistente.

### ✅ Pré-requisitos

- **Node.js 18+**
- **npm** (ou **yarn**)

### 📦 Instalação e execução

1. Acesse a pasta do frontend:

```bash
cd front/chat-project-ia
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em:
📍 [http://localhost:3000](http://localhost:3000)

### 📁 Estrutura do Frontend

```
front/chat-project-ia/
├── src/
│   ├── app/                # Páginas e layout principal (Next.js App Router)
│   ├── components/
│   │   ├── custom/         # Componentes customizados (home, input, mensagens, etc.)
│   │   └── ui/             # Componentes de UI reutilizáveis (botão, input, card)
│   ├── hooks/              # Hooks customizados (ex: useChatApi)
│   ├── lib/                # Funções utilitárias
│   └── types/              # Tipos TypeScript
├── public/                 # Arquivos estáticos
├── package.json            # Dependências e scripts
```

### 🔗 Integração com o Backend

O frontend se comunica com a API FastAPI (backend) para enviar perguntas e receber respostas. Certifique-se de que o backend esteja rodando em [http://localhost:8000](http://localhost:8000) (ou ajuste a URL no frontend, se necessário).

- O hook `useChatApi` faz as requisições para a API.
- Para ambientes de produção, configure as variáveis de ambiente conforme necessário.

---
