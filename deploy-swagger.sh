#!/bin/bash

echo "🚀 Help App Backend - Swagger Documentation Deployment"
echo "===================================================="

# Create deployment directory
mkdir -p swagger-deployment/public
cd swagger-deployment

# Copy swagger specification
cp ../complete-swagger-spec.json public/swagger.json

# Create package.json for Vercel deployment
cat > package.json << 'EOF'
{
  "name": "help-app-swagger-docs",
  "version": "1.0.0",
  "description": "Help App Backend API Documentation",
  "scripts": {
    "build": "echo 'Static files ready for deployment'",
    "start": "serve public -p 3000",
    "dev": "serve public -p 3000"
  },
  "dependencies": {
    "serve": "^14.2.0"
  }
}
EOF

# Create Swagger UI HTML page
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Help App Backend API Documentation</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  <style>
    .topbar { display: none; }
    .swagger-ui .info .title {
      font-size: 36px;
      color: #3b82f6;
    }
    .swagger-ui .info .description {
      max-width: none;
    }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        url: './swagger.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        showExtensions: true,
        showCommonExtensions: true,
        displayRequestDuration: true,
        persistAuthorization: true,
        supportedSubmitMethods: ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']
      });
    };
  </script>
</body>
</html>
EOF

# Create Vercel configuration
cat > vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "public/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ]
}
EOF

# Create README for deployment
cat > README.md << 'EOF'
# Help App Backend API Documentation

This is the public documentation for the Help App Backend API, deployed using Swagger UI.

## 🚀 Live Documentation
- Interactive API documentation with all endpoints
- JWT authentication testing capabilities
- Complete request/response examples

## 🛠 Tech Stack
- **Backend**: NestJS with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport
- **Documentation**: OpenAPI 3.0 with Swagger UI

## 📊 API Features
- User management (Client/Provider registration)
- Service catalog management
- Booking system with status tracking
- Review and rating system
- Comprehensive authentication

## 🔗 GitHub Repository
[Help App Backend](https://github.com/your-username/help-app-backend)

## 👨‍💻 Developer
**Awe Joseph Olaitan**
- Website: https://awejosepholaitan.dev
- Contact: Developer Assessment Project
EOF

echo ""
echo "✅ Deployment files created successfully!"
echo ""
echo "📁 Directory structure:"
echo "   swagger-deployment/"
echo "   ├── public/"
echo "   │   ├── index.html"
echo "   │   └── swagger.json"
echo "   ├── package.json"
echo "   ├── vercel.json"
echo "   └── README.md"
echo ""
echo "🎯 Next Steps:"
echo "   1. SwaggerHub: Upload 'swagger.json' to https://swagger.io/tools/swaggerhub/"
echo "   2. Vercel: Run 'cd swagger-deployment && npx vercel --prod'"
echo "   3. Netlify: Drag 'swagger-deployment' folder to https://app.netlify.com/drop"
echo ""
echo "🌐 Expected URLs after deployment:"
echo "   - SwaggerHub: https://app.swaggerhub.com/apis/your-username/help-app-backend-api/1.0.0"
echo "   - Vercel: https://help-app-docs.vercel.app"
echo ""
echo "📋 Ready for assessment submission! ✅" 