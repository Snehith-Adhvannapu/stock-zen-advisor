# Algora - AI Trading Platform

## Project Overview
This is a frontend-only React application built with Vite, TypeScript, and shadcn-ui components. The application provides an AI-powered trading platform with features for stock analysis and auto-trading.

## Recent Changes
- **2025-10-02**: Initial import setup for Replit environment
  - Configured Vite to run on port 5000 with proper host settings for Replit proxy
  - Set up development and preview configurations
  - Configured deployment settings for autoscale deployment

## Tech Stack
- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.19
- **Language**: TypeScript 5.8.3
- **UI Library**: shadcn-ui (Radix UI components)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM 6.30.1
- **State Management**: TanStack Query 5.83.0
- **Form Handling**: React Hook Form with Zod validation

## Project Structure
```
├── src/
│   ├── components/
│   │   └── ui/          # shadcn-ui components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Application pages
│   │   ├── Landing.tsx
│   │   ├── Index.tsx (Stock Advisor)
│   │   ├── AutoTrading.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── vite.config.ts       # Vite configuration
```

## Development
- **Start Dev Server**: The "Start application" workflow runs `npm run dev` on port 5000
- **Build**: `npm run build` creates production build
- **Preview**: `npm run preview` serves production build on port 5000

## Deployment
- **Target**: Autoscale deployment (stateless frontend)
- **Build Command**: `npm run build`
- **Run Command**: `npm run preview`
- **Port**: 5000

## Configuration Notes
- Vite is configured to use 0.0.0.0 as host for Replit's environment
- HMR (Hot Module Replacement) configured for WebSocket connections
- Preview server configured to run on port 5000 for deployment
