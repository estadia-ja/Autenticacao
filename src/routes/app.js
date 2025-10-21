import express from 'express';
import { testConnection } from '../config/database.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../docs/swagger.js'; 
import cors from 'cors';
import userRoutes from '../user/routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Teste banco (igual)
app.get('/test-db', async (req, res) => {
    const isConnected = await testConnection();
    res.json({
        message: 'Teste de conexão com o banco',
        database: isConnected ? 'Conectado' : 'Error'
    });
});

// Rotas da api
app.use('/user', userRoutes);

export { app };