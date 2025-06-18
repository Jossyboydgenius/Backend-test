# 🚀 Help App Backend

A comprehensive NestJS-based backend API for the Help App - a service-based platform that connects clients with service providers for on-demand tasks such as plumbing, cleaning, and electrical work.

## 📖 Documentation

**📋 Complete API Documentation**: [`HELP_APP_API_DOCUMENTATION.md`](./HELP_APP_API_DOCUMENTATION.md)
- Comprehensive project overview with Mermaid diagrams
- Detailed API endpoint documentation with examples
- Database schema and relationships
- Authentication system details
- Error handling and status codes
- Development and deployment guides

**🌐 Interactive API Documentation**: http://localhost:3000/api
- Full Swagger UI with interactive endpoint testing
- Detailed request/response examples
- Authentication token management
- Real-time API exploration

## 📦 Tech Stack

- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens) with Passport
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI with comprehensive examples
- **Security**: bcryptjs for password hashing
- **Environment**: TypeScript

## 🛠 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone and install**
```bash
git clone <repository-url>
cd help-app-backend
npm install
```

2. **Environment Setup**
```env
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=your_api_key"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="24h"
PORT=3000
NODE_ENV="development"
```

3. **Database Setup**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

4. **Start Development Server**
```bash
npm run start:dev
```

5. **Access Documentation**
- **API Documentation**: http://localhost:3000/api
- **Health Check**: http://localhost:3000

## 🎯 Core Features

### 🏗 Architecture
- **Modular NestJS Structure**: Clean separation of concerns with modules for auth, services, bookings, and reviews
- **Database Layer**: Prisma ORM with PostgreSQL for robust data management
- **Security Layer**: JWT authentication with role-based access control
- **Validation Layer**: Comprehensive input validation with detailed error responses

### 🔐 Authentication System
- **User Types**: CLIENT (service consumers) and PROVIDER (service providers)
- **JWT Tokens**: Secure authentication with configurable expiration
- **Protected Routes**: Role-based access control for sensitive operations

### 📊 Data Models
- **Users**: Complete profile management with role-based permissions
- **Services**: Service catalog with admin-managed service types
- **Bookings**: End-to-end booking lifecycle management
- **Reviews**: Rating and feedback system for service quality

## 🔌 API Endpoints Overview

### 🏠 Health Check
- `GET /` - API health verification

### 🔑 Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication  
- `GET /api/auth/me` - Profile retrieval

### 🛠 Services
- `GET /api/services` - Service catalog (public)
- `POST /api/services` - Service creation (protected)

### 📅 Bookings
- `POST /api/bookings` - Booking creation
- `GET /api/bookings` - User bookings
- `PATCH /api/bookings/:id` - Status updates

### ⭐ Reviews
- `POST /api/reviews` - Service reviews

## 🧪 Testing & Development

### 🎯 Automated Testing Scripts

We provide two comprehensive test scripts to validate all API endpoints:

#### 1. Complete Integration Test (Quick & Simple)
```bash
# Simple integration test with colorized output
bash complete-integration-test.sh
```
**Features:**
- ✅ Quick validation of core functionality
- 🎨 Colorized terminal output for easy reading
- 🔄 Creates unique test users automatically
- 📊 Clear status summary at the end
- ⚡ Fast execution (< 30 seconds)

#### 2. Comprehensive API Test Suite (Detailed)
```bash
# Full endpoint testing with detailed validation
bash test-all-endpoints.sh
```
**Features:**
- 🔍 Tests all 10+ API endpoints systematically
- 🎨 Rich colorized output with status indicators
- 👥 Creates both CLIENT and PROVIDER test users
- 📋 Detailed response validation and error handling
- 🔗 Tests complete booking workflow end-to-end
- 📈 Comprehensive test summary with status codes

### 🚀 How to Use the Test Scripts

1. **Start the server first:**
```bash
npm run start:dev
```

2. **Run the quick integration test:**
```bash
# For basic functionality validation
bash complete-integration-test.sh
```

3. **Run the comprehensive test suite:**
```bash
# For thorough API testing
bash test-all-endpoints.sh
```

### 📊 Expected Output

Both scripts provide colorized output:
- 🟢 **Green**: Successful operations
- 🔴 **Red**: Errors or failures  
- 🟡 **Yellow**: Test section headers
- 🔵 **Blue**: Informational messages
- 🟣 **Purple**: Summary sections

### Manual Testing
```bash
# Health check
curl http://localhost:3000

# User registration
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","userType":"CLIENT"}'

# Protected endpoint (replace TOKEN)
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Available Scripts
- `npm run start:dev` - Development server with hot reload
- `npm run build` - Production build
- `npm run test` - Unit tests
- `npm run test:e2e` - End-to-end tests
- `npm run lint` - Code linting
- `npx prisma studio` - Database GUI

## 🚀 Production Deployment

### Environment Configuration
- Update `JWT_SECRET` with cryptographically secure key
- Configure production PostgreSQL instance
- Enable HTTPS/SSL certificates
- Implement rate limiting and monitoring

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## 💡 Implementation Notes

### Key Features Implemented
✅ Complete user authentication system
✅ Service catalog management
✅ Booking lifecycle management
✅ Review and rating system
✅ Comprehensive API documentation
✅ Input validation and error handling
✅ JWT security implementation
✅ Database relationships and constraints

### Assumptions Made
- Admin role functionality is basic (service creation)
- Single-provider booking assignment
- Basic review validation (one per booking)
- Development-focused environment setup

## 📞 Support

For detailed implementation guides, API specifications, and troubleshooting:
- **Complete Documentation**: [`HELP_APP_API_DOCUMENTATION.md`](./HELP_APP_API_DOCUMENTATION.md)
- **Interactive API Docs**: http://localhost:3000/api
- **Database GUI**: http://localhost:5555 (Prisma Studio)

---

**Last Updated**: June 18, 2024  
**API Version**: 1.0.0  
**Documentation**: [Complete API Documentation](./HELP_APP_API_DOCUMENTATION.md)
