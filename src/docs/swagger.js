import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Serviço de Autenticação - Estadia Já',
        version: '1.0.0',
        description: 'Documentação da API de autenticação (registro e login)' 
    },
    servers: [
        {
            url: 'http://localhost:3001', 
            description: 'Servidor de desenvolvimento'
        },
    ],
    components:{
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    tags: [
        {
            name: 'Autenticação', 
            description: 'Rotas de registro e login de usuário'
        }
    ],
};

const options = {
    swaggerDefinition,
    apis: [
        './src/user/routes.js' 
    ],
  };

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;