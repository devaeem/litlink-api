import swaggerJsdoc from 'swagger-jsdoc';
import { xenv } from './setting';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Store API',
      version: '1.0.0',
      description: 'API documentation for Book Store Management System',
    },
    servers: [
      {
        url: `http://localhost:${xenv.PORT}`,
        description: 'Book Store Development Server',
      },
    ],
  },
  apis: [
    './src/config/swagger/*.ts'
  ],
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);