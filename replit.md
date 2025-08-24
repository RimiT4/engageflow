# MM2 Item Claim System

## Overview

This is a Murder Mystery 2 (Roblox) item claim system that allows users to verify their identity and claim purchased items through a secure multi-step process. The application guides users through form submission, verification, attention prompts, bot friend request, and final confirmation before directing them to a private Roblox server to receive their items.

## Recent Changes (August 21, 2025)

- **Supabase Database Migration**: Successfully migrated from agent environment to standard Replit
  - **Fresh Database Connection**: Reset and configured new Supabase credentials 
  - **Persistent Storage**: All claims now save to PostgreSQL database via Drizzle ORM
  - **Environment Variables**: Properly configured .env file with all secret values
- **Enhanced Thank You Page**: User-friendly order confirmation with detailed information
  - **Order Details Display**: Shows Order ID, email address, and Roblox username
  - **Centered Support Section**: Professional support contact box with support@mm2items.com
  - **24-Hour Support Promise**: Clear instructions for contacting support within 24 hours
- **Dual-Flow Architecture**: Optimized for two distinct user paths
  - **"Join Private Server" Flow**: Claim → Verification → Attention → Final Confirmation → Thank You
  - **"Add Bot" Flow**: Claim → Verification → Attention → Bot Page → Thank You
- **Smart Progress Tracking**: Dynamic step counting based on user's chosen flow
- **Roblox API Integration**: Real-time username validation and avatar fetching
- **Enhanced Email Validation**: Custom regex validation for email addresses
- **Streamlined User Experience**: Removed redundant buttons and improved flow clarity

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Built using React 18 with TypeScript for type safety and modern development practices
- **Vite**: Development server and build tool for fast hot module replacement and optimized production builds
- **Wouter**: Lightweight client-side routing library for navigation between pages
- **Tailwind CSS**: Utility-first CSS framework with custom gaming-themed color scheme and variables
- **Shadcn/ui Components**: Pre-built UI component library with Radix UI primitives for accessibility
- **Framer Motion**: Animation library for smooth transitions and interactive elements throughout the claim process

### Backend Architecture
- **Express.js**: Node.js web server framework handling API routes and middleware
- **ESM Modules**: Modern ES module syntax with TypeScript compilation
- **Development/Production Split**: Separate configurations for development (with Vite integration) and production builds

### Data Storage
- **PostgreSQL**: Primary database using Neon Database serverless hosting
- **Drizzle ORM**: Type-safe database queries and schema management with automatic migrations
- **In-Memory Storage**: Fallback storage implementation for development and testing

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Claim Requests Table**: Multi-step claim process tracking with fields for contact info, order ID, Roblox username, current step, and completion status
- **Validation**: Zod schema validation for form inputs with email verification and username matching

### Authentication & Validation
- **Form Validation**: React Hook Form with Zod resolvers for client-side validation
- **Multi-Step Process**: State-managed progression through claim, verification, attention, and confirmation steps
- **Input Sanitization**: Email validation, username length limits, and required field enforcement

### UI/UX Design Patterns
- **Gaming Theme**: Dark color scheme with purple/red/gold accent colors mimicking gaming aesthetics
- **Progressive Disclosure**: Multi-step wizard interface reducing cognitive load
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Accessibility**: Radix UI primitives ensure keyboard navigation and screen reader support

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle Kit**: Database migration and schema management tools

### UI Libraries
- **Radix UI**: Headless component primitives for dialogs, forms, navigation, and interactive elements
- **Tailwind CSS**: Utility-first styling with PostCSS processing
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **TypeScript**: Static type checking and enhanced developer experience
- **Vite**: Fast development server with hot module replacement
- **ESBuild**: Production bundling and code minification
- **React Query**: Server state management and caching (TanStack Query)

### Animation & Interaction
- **Framer Motion**: Declarative animations for page transitions and micro-interactions
- **React Hook Form**: Form state management with validation integration

### Third-Party Integrations
- **Roblox Platform**: External game platform integration for user verification and server joining
- **Replit Environment**: Development environment integration with runtime error handling and cartographer plugin

The system is designed as a single-page application with a clear separation between client and server concerns, utilizing modern web development practices for performance, maintainability, and user experience.