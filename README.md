# Fullstack Apollo GraphQL + Vite React App

A modern, full-stack monorepo application built for rapid development and high performance. It features a Vite + React frontend communicating with an Apollo GraphQL backend, all written in TypeScript.

## 🚀 Features

- **Monorepo Architecture:** Manages both client and server in a single repository using npm workspaces.
- **GraphQL API:** Type-safe, efficient data fetching using Apollo Server and schemas.
- **JWT Authentication:** Secure login flow with short-lived Access Tokens and long-lived Refresh Tokens.
- **Modern Frontend:** Lightning-fast builds with Vite, React, and TypeScript.
- **Beautiful UI:** Accessible, customizable components powered by shadcn/ui and Tailwind CSS.
- **Smart Caching:** Global state management and request caching handled by Apollo Client.

## 🛠️ Tech Stack

### Root Workspace

- `npm workspaces` — Dependency management
- `concurrently` — Running frontend and backend simultaneously

### Backend (`/server`)

- `@apollo/server` & `graphql` — API layer
- `jsonwebtoken` — Auth and session management
- `typescript` & `ts-node` — Static typing and execution
- Node.js (ES Modules)

### Frontend (`/client`)

- `react` & `vite` — UI library and build tool
- `@apollo/client` — GraphQL client and caching engine
- `shadcn/ui` & `tailwindcss` — UI component system
- `typescript` — Static typing

## 📁 Project Structure

```text
fullappwithbackend/
├── package.json          # Root workspace configuration
├── client/               # Vite React Frontend
│   ├── src/
│   │   ├── apolloClient/ # Apollo setup & Auth Links
│   │   ├── components/   # shadcn/ui components
│   │   └── main.tsx
│   └── package.json
└── server/               # Apollo GraphQL Backend
    ├── src/
    │   ├── Data/         # Local JSON database files
    │   ├── Schema/       # typeDefs and resolvers
    │   ├── utils/        # Auth middleware
    │   └── index.ts      # Apollo Server setup
    └── package.json
```
