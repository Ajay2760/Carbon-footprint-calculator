# EcoCalculator - Carbon Footprint Calculator

## Overview

EcoCalculator is a comprehensive carbon footprint tracking application that helps users calculate and understand their environmental impact across four key areas: transportation, home energy, food consumption, and waste generation. The application provides personalized recommendations to help users reduce their carbon footprint and make more sustainable choices.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom eco-themed color palette
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks for local state, TanStack Query for server state
- **Data Visualization**: Recharts for carbon footprint breakdown charts
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Development Server**: Integrated Vite dev server for hot module replacement
- **Storage**: In-memory storage implementation with interface for future database integration

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route components
│   │   ├── lib/          # Utilities and calculations
│   │   └── hooks/        # Custom React hooks
├── server/           # Backend Express application
├── shared/           # Shared types and schema definitions
└── migrations/       # Database migration files
```

## Key Components

### Carbon Footprint Calculator
- **Transportation Section**: Tracks vehicle usage, fuel efficiency, public transport, and flight data
- **Home Energy Section**: Monitors electricity/gas bills, home size, heating sources, and renewable energy usage
- **Food Section**: Analyzes diet type, meat consumption, local food purchasing, and food waste levels
- **Waste Section**: Evaluates recycling habits, clothing purchases, and electronic device upgrades

### Calculation Engine
- **Emission Factors**: Science-based coefficients for converting activities to CO2 emissions
- **Real-time Calculations**: Dynamic updates as users input data
- **Personalized Tips**: Context-aware recommendations based on user's specific carbon footprint profile

### Data Visualization
- **Interactive Pie Charts**: Visual breakdown of emissions by category
- **Progress Indicators**: Comparison against global averages
- **Impact Metrics**: Clear display of potential savings from recommended actions

## Data Flow

1. **User Input**: Users enter data through form components in each section
2. **Real-time Calculation**: Input changes trigger immediate recalculation using emission factors
3. **Results Display**: Updated emissions are visualized in charts and summary cards
4. **Tip Generation**: Personalized recommendations are generated based on high-impact areas
5. **Data Persistence**: Future implementation will save calculations to PostgreSQL database

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **UI Framework**: Radix UI primitives, Tailwind CSS, shadcn/ui components
- **Data Visualization**: Recharts for interactive charts
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React icon library

### Backend Dependencies
- **Web Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL (Neon serverless)
- **Development Tools**: tsx for TypeScript execution, esbuild for production builds
- **Session Management**: connect-pg-simple for PostgreSQL session storage

### Development Tools
- **Build Tools**: Vite for frontend, esbuild for backend
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint, Prettier (implied by shadcn/ui setup)
- **Database Management**: Drizzle Kit for schema management and migrations

## Deployment Strategy

### Development Environment
- **Replit Integration**: Configured for Replit with automatic environment detection
- **Hot Reload**: Vite dev server with Express backend integration
- **Database**: PostgreSQL 16 module for local development

### Production Build
- **Frontend**: Vite build process generates optimized static assets
- **Backend**: esbuild bundles server code for production deployment
- **Deployment Target**: Autoscale deployment on Replit infrastructure
- **Port Configuration**: External port 80 mapping to internal port 5000

### Environment Configuration
- **Development**: `npm run dev` - runs with hot reload and development features
- **Production**: `npm run build && npm run start` - builds and runs optimized version
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

## Changelog

```
Changelog:
- June 18, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```