const { NestFactory } = require('@nestjs/core');
const { SwaggerModule, DocumentBuilder } = require('@nestjs/swagger');
const { AppModule } = require('./dist/app.module');
const fs = require('fs');
const path = require('path');

async function generateSwaggerSpec() {
  const app = await NestFactory.create(AppModule, { logger: false });

  const config = new DocumentBuilder()
    .setTitle('Help App Backend API')
    .setDescription(`
# 🚀 Help App Backend API

A comprehensive service-based platform API that connects clients with service providers for on-demand tasks.

## 🎯 Features

- **User Management**: Client and provider registration/authentication
- **Service Catalog**: Browse and manage service types
- **Booking System**: Create, manage, and track service bookings  
- **Review System**: Rate and review completed services
- **JWT Authentication**: Secure API access with role-based permissions

## 🔐 Authentication

This API uses JWT (JSON Web Token) authentication. To access protected endpoints:

1. Register a new account using \`POST /api/auth/signup\`
2. Login using \`POST /api/auth/login\` to receive your JWT token
3. Include the token in the Authorization header: \`Bearer YOUR_JWT_TOKEN\`

## 📱 User Types

- **CLIENT**: Can book services and leave reviews
- **PROVIDER**: Can accept bookings and receive reviews

## 🌐 Live Demo

- **GitHub Repository**: https://github.com/your-username/help-app-backend
- **Local Development**: http://localhost:3000/api
    `)
    .setVersion('1.0.0')
    .setContact('Awe Joseph Olaitan', 'https://awejosepholaitan.dev', 'your-email@domain.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000', 'Development Server')
    .addServer('https://api.helpapp.com', 'Production Server')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter your JWT token to access protected endpoints',
    })
    .addTag('Health Check', 'API health verification endpoints')
    .addTag('Authentication', 'User registration, login, and profile management')
    .addTag('Services', 'Service type management and discovery')
    .addTag('Bookings', 'Booking creation, management, and status updates')
    .addTag('Reviews', 'Service rating and review system')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Write the OpenAPI spec to a JSON file
  const outputPath = path.join(__dirname, 'swagger-spec.json');
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));
  
  console.log('✅ Swagger specification generated successfully!');
  console.log(`📄 Saved to: ${outputPath}`);
  console.log('🚀 Ready for deployment to SwaggerHub or Vercel!');
  
  await app.close();
}

generateSwaggerSpec().catch(console.error); 