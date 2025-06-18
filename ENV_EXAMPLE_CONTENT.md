# .env.example File Content

Copy the content below to create a `.env.example` file in your project root:

```env
# Database Configuration
# Get your Prisma Accelerate connection string from: https://console.prisma.io/
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=your-accelerate-api-key-here"

# JWT Configuration  
# Use a strong, unique secret key for production (minimum 32 characters)
JWT_SECRET="your-super-secret-jwt-key-change-in-production-b8c7d9e1f2a3b4c5d6e7f8g9h0i1j2k3"
JWT_EXPIRES_IN="24h"

# Server Configuration
PORT=3000
NODE_ENV=development
```

## Instructions:

1. Create a new file named `.env.example` in the `help-app-backend/` directory
2. Copy the content above into the file
3. Replace the placeholder values with instructions for other developers
4. This file should be committed to version control (unlike `.env`)

## Security Notes:

- Never commit the actual `.env` file with real credentials
- Keep your actual `DATABASE_URL` and `JWT_SECRET` secure
- Use strong, unique secrets in production environments
- The `.env.example` file helps other developers understand required environment variables 