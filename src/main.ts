import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global exception filter for Prisma errors
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapterHost));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Help App API')
    .setDescription(
      `A comprehensive service-based platform that connects clients with service providers for on-demand tasks such as plumbing, cleaning, electrical work, and more.

**Core Features:**
- User Management: Client and provider registration/authentication
- Service Catalog: Browse and manage service types  
- Booking System: Create, manage, and track service bookings
- Review System: Rate and review completed services
- JWT Authentication: Secure API access with role-based permissions

**Authentication:** Most endpoints require authentication. Use the "Authorize" button above to add your JWT token.

**User Types:** CLIENT (can book services and leave reviews) | PROVIDER (can accept bookings and receive reviews)

**Booking Status Flow:** PENDING → ACCEPTED/REJECTED → COMPLETED/CANCELLED`,
    )
    .setVersion('1.0.0')
    .setContact(
      'Awe Joseph Olaitan',
      'https://github.com/Jossyboydgenius/Backend-test.git',
      'awejosepholaitan@gmail.com',
    )
    .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000', 'Development Server')
    .addServer('https://api.helpapp.com', 'Production Server')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter your JWT token to access protected endpoints',
    })
    .addTag('Health Check', 'API health verification endpoints')
    .addTag(
      'Authentication',
      'User registration, login, and profile management',
    )
    .addTag('Services', 'Service type management and discovery')
    .addTag('Bookings', 'Booking creation, management, and status updates')
    .addTag('Reviews', 'Service rating and review system')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Help App API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(
    `Swagger documentation available at: http://localhost:${port}/api`,
  );
  console.log(
    '📖 Comprehensive API Documentation: ./HELP_APP_API_DOCUMENTATION.md',
  );
}

void bootstrap().catch((err) => {
  console.error('Failed to start the application:', err);
  process.exit(1);
});
