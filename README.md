# Node.js TypeScript Template - Express API with Sequelize & JWT

🚀 Production-ready Node.js monolithic server template with Express, Sequelize, and JWT authentication - **TypeScript Edition**.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-blue.svg)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-orange.svg)](https://sequelize.org/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supported-blue.svg)](https://www.postgresql.org/)

> ⚡ **Quick Start**: Clone, install dependencies, configure `.env`, and run `npm run dev` - you're ready to build with full TypeScript support!

## 📌 What is this?

A production-ready Node.js backend template featuring:

- **TypeScript** for type safety and better developer experience
- **Feature-first architecture** for scalable code organization
- **JWT authentication** out of the box
- **PostgreSQL** database with Sequelize ORM
- **Security best practices** (Helmet, CORS, rate limiting)
- **Clean code structure** following industry standards
- **Full type definitions** for all models, services, and controllers

Perfect for startups, MVPs, or learning modern TypeScript backend development.

## ✨ Features

- 🏗️ **Feature-first architecture** - Organized by domain/feature
- 🔐 **JWT Authentication** - Secure token-based auth with TypeScript types
- 🗄️ **Sequelize ORM** - PostgreSQL with Supabase support
- 🛡️ **Security** - Helmet, CORS, rate limiting
- 📝 **Error Handling** - Centralized error handling with typed errors
- ✅ **Validation** - Request validation middleware with TypeScript
- 📊 **Logging** - Structured logging utility
- 🔄 **Graceful Shutdown** - Proper cleanup on termination
- 💪 **Type Safety** - Full TypeScript support with strict mode

## 📁 Project Structure

```
src/
├── config/          # Database configuration
├── features/        # Feature modules (users, products)
│   ├── users/       # User feature (auth, JWT)
│   └── products/    # Product feature
├── shared/          # Shared resources
│   ├── middleware/  # Shared middleware
│   ├── utils/       # Utility functions
│   ├── constants/   # Constants
│   └── types/       # TypeScript type definitions
├── models/          # Sequelize models index
├── routes/          # Route registration
├── app.ts           # Express app configuration
└── server.ts        # Server entry point
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
```

### 3. Start Development Server

```bash
npm run dev
```

The development server uses `tsx` for hot reloading TypeScript files.

### 4. Build for Production

```bash
npm run build
npm run prod
```

### 5. Type Checking

```bash
npm run type-check
```

## 📡 API Endpoints

Same as the JavaScript version - see the main README for details.

## 🛠️ Technologies

- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **Sequelize** - ORM for PostgreSQL
- **PostgreSQL** (Supabase) - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Helmet** - HTTP security
- **CORS** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting

## 📋 TypeScript Configuration

The project uses strict TypeScript configuration:

- **Strict mode** enabled
- **ES2022** target
- **ESNext** modules
- **Source maps** for debugging
- **Declaration files** generated

See `tsconfig.json` for full configuration.

## 🔒 Type Safety

All models, services, controllers, and middleware are fully typed:

- **Models**: Sequelize models with TypeScript interfaces
- **Services**: Typed business logic functions
- **Controllers**: Typed Express handlers
- **Middleware**: Typed request/response handlers
- **Types**: Shared type definitions in `src/shared/types/`

## 📝 Code Style

- Double quotes for strings
- Semicolons
- 2-space indentation
- ES6+ modules
- TypeScript strict mode
- JSDoc comments for functions

## 🚢 Deployment

### Build Process

1. Run `npm run build` to compile TypeScript to JavaScript
2. The compiled code will be in the `dist/` directory
3. Run `npm start` or `npm run prod` to start the server

### Environment Setup

1. Set `NODE_ENV=production`
2. Configure `DATABASE_URL` with production database
3. Set strong `JWT_SECRET`
4. Configure `CORS_ORIGIN` for your frontend domain

## 📚 Differences from JavaScript Version

- ✅ Full TypeScript type safety
- ✅ Interface definitions for all data structures
- ✅ Typed Express request/response handlers
- ✅ Type-safe Sequelize models
- ✅ Compile-time error checking
- ✅ Better IDE autocomplete and IntelliSense

## 📄 License

ISC

## 🤝 Contributing

This is a template - feel free to fork and customize for your needs!
