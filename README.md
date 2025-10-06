# 🔗 Link Manager - Next.js Application

A modern, feature-rich link management application built with Next.js 15, React, TypeScript, and Tailwind CSS. Features dark/light mode, authentication with better-auth, and beautiful iframe previews.

![Link Manager Preview](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Modern UI/UX**
- **Dark/Light Mode**: Automatic theme detection with manual toggle
- **Glass Morphism**: Beautiful backdrop blur effects
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Micro-interactions and transitions

### 🔐 **Authentication**
- **Better Auth Integration**: Secure authentication system
- **OAuth Support**: Google and GitHub login
- **Magic Link**: Passwordless authentication option
- **Role-based Access**: Admin-only access to management features
- **Email Verification**: Secure account verification

### 🔗 **Link Management**
- **CRUD Operations**: Create, read, update, delete links
- **Live Preview**: Iframe previews of websites
- **Admin Protection**: Management page restricted to admin users
- **Beautiful Forms**: Validation and error handling

### 📱 **Pages**
- **Landing Page**: Modern hero section with feature cards
- **Links Display**: Grid layout with iframe previews
- **Admin Panel**: Full link management interface
- **Auth Pages**: Beautiful login/register pages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Email provider (Gmail recommended)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file with:
   - Database URL
   - Better Auth secret
   - Email credentials
   - OAuth keys (optional)
   - Admin emails

3. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma db push
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` (or the assigned port)

## 📖 Environment Variables

### Required Variables
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
BETTER_AUTH_SECRET="your-secret-key"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Email Configuration
```env
NODEMAILER_USER="your-email@gmail.com"
NODEMAILER_APP_PASSWORD="your-gmail-app-password"
```

### OAuth (Optional)
```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### Admin Setup
```env
ADMIN_EMAILS="admin1@example.com;admin2@example.com"
```

## 🏗 Project Structure

```
src/
├── 📁 app/                    # Next.js App Router
│   ├── page.tsx              # Landing page
│   ├── links/                # Links display
│   ├── links-update/         # Admin management
│   └── auth/                 # Authentication pages
├── 📁 components/            # React components
│   ├── ThemeToggle.tsx       # Theme switching
│   ├── Providers.tsx         # Context providers
│   └── LinksUpdate*.tsx      # Admin components
├── 📁 contexts/              # React contexts
│   ├── ThemeContext.tsx      # Theme management
│   └── LinksContext.tsx      # Links state
├── 📁 lib/                   # Utility libraries
│   ├── auth.ts              # Better auth config
│   ├── prisma.ts            # Database client
│   └── utils.ts             # Helper functions
└── 📁 actions/               # Server actions
    └── send-email.action.ts  # Email functionality
```

## 🎯 Usage Guide

### For Regular Users
1. **Home Page**: Browse features and navigate to links
2. **View Links**: See all links with iframe previews
3. **Authentication**: Sign up/login with email or OAuth

### For Administrators
1. **Admin Access**: Users in `ADMIN_EMAILS` get admin role
2. **Link Management**: Full CRUD operations on `/links-update`
3. **Protected Routes**: Authentication required for management

### Theme Switching
- **Auto Detection**: Respects system preferences
- **Manual Toggle**: Available on all pages
- **Persistence**: Remembers user choice

## 🛠 Development

### Key Technologies
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Authentication**: Better Auth
- **Database**: Prisma ORM with PostgreSQL
- **Email**: Nodemailer
- **State**: React Context API
- **TypeScript**: Full type safety

### Code Organization
- **Server Components**: Authentication checks
- **Client Components**: Interactive UI
- **Context Providers**: Global state management
- **Custom Hooks**: Reusable logic

## 🔒 Security Features

- **Protected Routes**: Server-side authentication
- **Role-based Access**: Admin-only management
- **Email Verification**: Account security
- **CSRF Protection**: Built-in security
- **Secure Cookies**: HttpOnly and Secure flags

## 🚀 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

---

**✅ Build Status: All errors resolved and server running successfully!**

**Built with ❤️ using modern web technologies**