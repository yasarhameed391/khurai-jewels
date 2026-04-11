const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Khurai Jewels API',
      version: '1.0.0',
      description: 'E-commerce API for Khurai Jewels',
      contact: { name: 'API Support' }
    },
    servers: [{ url: 'http://localhost:3000', description: 'Development server' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            price: { type: 'number' },
            description: { type: 'string' },
            image: { type: 'string' },
            category: { type: 'string' },
            stock: { type: 'number' }
          }
        },
        User: {
          type: 'object',
          properties: { id: { type: 'string' }, name: { type: 'string' }, email: { type: 'string' } }
        },
        Cart: {
          type: 'object',
          properties: { userId: { type: 'string' }, items: { type: 'array' } }
        },
        Order: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            userId: { type: 'string' },
            products: { type: 'array' },
            totalAmount: { type: 'number' },
            paymentStatus: { type: 'string' }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);
