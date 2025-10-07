# Overview

This is a modern blog application built with a React frontend and Express.js backend. The application allows users to create, view, like, and comment on blog posts. It features a clean, responsive design using shadcn/ui components and Tailwind CSS for styling. The app supports markdown rendering for post content and includes social sharing functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built with React 18 using TypeScript and employs a modern component-based architecture:

- **Framework**: React with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Build Tool**: Vite for fast development and optimized production builds
- **Form Handling**: React Hook Form with Zod schema validation

The frontend follows a feature-based structure with pages, components, hooks, and utility functions organized logically. Components are designed to be reusable and follow the compound component pattern where appropriate.

## Backend Architecture

The backend uses Express.js with TypeScript in a RESTful API design:

- **Framework**: Express.js with TypeScript for the server
- **Architecture Pattern**: RESTful API with clear separation of concerns
- **Data Layer**: Storage abstraction interface with in-memory implementation (MemStorage)
- **File Handling**: Multer middleware for image uploads with file size and type validation
- **Development**: Hot reload and middleware setup for development vs production environments

The backend is structured with route handlers, storage abstraction, and server configuration separated into distinct modules. This allows for easy swapping of storage implementations without affecting the API layer.

## Data Storage Strategy

The application uses a flexible storage abstraction pattern:

- **Interface**: IStorage interface defines methods for posts and comments operations
- **Current Implementation**: In-memory storage (MemStorage) for development/demo purposes
- **Database Schema**: Drizzle ORM schema defined for PostgreSQL with proper relationships
- **Migration Support**: Drizzle Kit configured for database migrations when PostgreSQL is added

The schema includes posts and comments tables with appropriate foreign key relationships, timestamps, and data validation. The storage interface supports CRUD operations, likes functionality, and proper data relationships.

## File Upload System

Image uploads are handled through a dedicated system:

- **Upload Directory**: Local file system storage in `/uploads` directory
- **File Validation**: Size limits (10MB) and MIME type validation for images only
- **Static Serving**: Express middleware serves uploaded files from `/uploads` endpoint
- **Error Handling**: Proper error responses for invalid file types and sizes

## Development Features

The application includes several development-focused features:

- **Hot Reload**: Vite development server with HMR for React components
- **TypeScript**: Full TypeScript support across frontend and backend
- **Path Aliases**: Configured import aliases for cleaner imports (@/, @shared/)
- **Error Handling**: Runtime error overlay and proper error boundaries
- **Logging**: Request logging middleware for API calls with timing information

# External Dependencies

## Frontend Dependencies

- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router
- **@radix-ui/***: Unstyled, accessible UI primitives for shadcn/ui
- **tailwindcss**: Utility-first CSS framework
- **react-hook-form**: Forms with validation
- **@hookform/resolvers**: Resolver for Zod validation schemas
- **zod**: Schema validation library
- **date-fns**: Date formatting and manipulation
- **lucide-react**: Icon library

## Backend Dependencies

- **express**: Web application framework
- **drizzle-orm**: TypeScript ORM with PostgreSQL support
- **drizzle-kit**: Database migration toolkit
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **multer**: Middleware for handling multipart/form-data (file uploads)
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## Development Tools

- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development plugins

## UI Component System

The application uses shadcn/ui, which provides:

- **Radix UI Primitives**: Accessible, unstyled components
- **Tailwind CSS**: Utility-based styling system
- **Custom Design Tokens**: Consistent color palette and spacing
- **Dark Mode Support**: CSS variables for theme switching
- **Component Variants**: Class variance authority for component variations