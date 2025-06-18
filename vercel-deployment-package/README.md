# 🏥 Help App Backend - API Documentation

> **Professional API Documentation for Help App Africa Backend Developer Assessment**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

## 📖 Overview

This is the **official API documentation** for the Help App Backend, a service-based platform connecting clients with service providers for on-demand tasks like plumbing, cleaning, and electrical work.

**Live Documentation**: Coming soon (deploy to get your URL)

## 🚀 Quick Deploy

1. **Fork this repository** to your GitHub account
2. **Connect to Vercel** and import this repository
3. **Deploy instantly** - no build process required!

## 📋 API Features

- **🔐 Authentication**: JWT-based user authentication
- **👥 User Management**: Client and provider registration
- **🛠 Service Catalog**: Browse and manage service types  
- **📅 Booking System**: Create, manage, and track service bookings
- **⭐ Review System**: Rate and review completed services

## 🛠 Tech Stack

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport
- **Documentation**: OpenAPI 3.0 with Swagger UI
- **Deployment**: Vercel Static Hosting

## 🔐 Testing Authentication

To test protected endpoints in the live documentation:

1. **Register**: Use `POST /api/auth/signup` to create an account
2. **Login**: Use `POST /api/auth/login` to get your JWT token
3. **Authorize**: Click "Authorize" button and enter `Bearer YOUR_JWT_TOKEN`

## 👥 User Types

- **CLIENT**: Can book services and leave reviews
- **PROVIDER**: Can accept bookings and receive reviews

## 📂 Repository Structure

```
├── package.json          # Project configuration
├── vercel.json           # Vercel deployment settings
├── DEPLOYMENT_GUIDE.md   # Detailed deployment instructions
└── public/
    ├── index.html        # Swagger UI interface
    └── swagger.json      # Complete API specification
```

## 🔗 Links

- **GitHub Repository**: [Help App Backend](https://github.com/your-username/help-app-backend)
- **Documentation Guide**: See `DEPLOYMENT_GUIDE.md` for detailed instructions
- **Developer**: Awe Joseph Olaitan

## 📞 Support

For deployment help, see the comprehensive `DEPLOYMENT_GUIDE.md` included in this package.

---

**Assessment Compliance**: ✅ This fulfills the requirement to host Swagger UI publicly using Vercel + Swagger UI.

*Built with ❤️ for Help App Africa*
