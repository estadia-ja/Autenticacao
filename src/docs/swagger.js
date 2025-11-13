import swaggerJSDoc from 'swagger-jsdoc';

const isProduction = process.env.NODE_ENV === 'production';

const productionServer = {
  url: 'https://estadia-ja-auth.onrender.com', 
  description: 'Servidor de Produção (Render)',
};

const developmentServer = {
  url: 'http://localhost:3001',
  description: 'Servidor de Desenvolvimento',
};

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Serviço de Autenticação - Estadia Já',
    version: '1.0.0',
    description: 'Documentação da API de autenticação (login)',
  },
  servers: isProduction ? [productionServer, developmentServer] : [developmentServer, productionServer],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  tags: [
    {
      name: 'Autenticação',
      description: 'Rota login de usuário',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    './src/auth/routes.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;