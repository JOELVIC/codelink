// swaggerDefinition.js
const swaggerDefinition = {
      openapi: '3.0.0',
      info: {
        title: 'CodeLink API Documentation',
        version: '1.0.0',
        description: 'API documentation for the CodeLink application',
      },
      servers: [
        {
          url: 'http://localhost:5000/api',
        },
      ],
    };
    
    module.exports = swaggerDefinition;
    