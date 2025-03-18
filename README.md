# Vercel AI SDK RAG Guide Starter Project

This is the starter project for the Vercel AI SDK [Retrieval-Augmented Generation (RAG) guide](https://sdk.vercel.ai/docs/guides/rag-chatbot).

In this project, you will build a chatbot that will only respond with information that it has within its knowledge base. The chatbot will be able to both store and retrieve information. This project has many interesting use cases from customer support through to building your own second brain!

This project will use the following stack:

- [Next.js](https://nextjs.org) 14 (App Router)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [OpenAI](https://openai.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Postgres](https://www.postgresql.org/) with [ pgvector ](https://github.com/pgvector/pgvector)
- [shadcn-ui](https://ui.shadcn.com) and [TailwindCSS](https://tailwindcss.com) for styling
- Flask and Python 


### Main features
- ChatGPT
- Retrieve organization users info
- Inpsect text doc
- Inspect Github repository
- Organizations users feedback

### Env Variables (root next)
- DATABASE_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL
- NEXTAUTH_URL_INTERNAL
- AUTH0_CLIENT_ID
- AUTH0_CLIENT_SECRET
- AUTH0_ISSUER
- AUTH0_BASE_URL
- AUTH0_SECRET

### Run Application
- Local
    - standalone frontend: pnpm run dev