# Dental Clinic Hub

A modern dental clinic management application built with React, Vite, and TypeScript.

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **UI Components**: Radix UI, Tailwind CSS, shadcn/ui
- **State Management**: TanStack Query
- **Routing**: Wouter
- **Package Manager**: npm

## Prerequisites

- Node.js 18+ 
- npm 9+

## Installation

```bash
npm install --legacy-peer-deps
```

## Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Build

Build for production:

```bash
npm run build
```

## GitHub Deployment

1. Push your code to GitHub
2. The project is ready for GitHub Pages or any static hosting

## Vercel Deployment

This project is pre-configured for Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the configuration from `vercel.json`
3. Deploy!

The Vercel configuration:
- **Build Command**: `cd artifacts/dental-clinic && npm run build`
- **Output Directory**: `artifacts/dental-clinic/dist/public`
- **Install Command**: `npm install --legacy-peer-deps`

## Project Structure

```
Dental-Clinic-Hub/
├── artifacts/
│   ├── dental-clinic/       # Main React application
│   ├── api-server/          # Backend API server
│   └── mockup-sandbox/      # Mockup sandbox
├── lib/
│   ├── api-client-react/    # API client for React
│   ├── api-spec/            # API specifications
│   ├── api-zod/             # Zod schemas
│   └── db/                  # Database utilities
└── scripts/                 # Build scripts
```

## Notes

- This project uses npm workspaces
- The `--legacy-peer-deps` flag is used during installation due to some peer dependency conflicts
- The main application is in `artifacts/dental-clinic`
