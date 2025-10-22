import express from 'express';
import { loginController } from './constroller.js';

const router = express.Router();

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Autentica um usuário
 *     tags: [Autenticação]
 *     description: Recebe email e senha, e retorna um token JWT se as credenciais forem válidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "joao.silva@email.com"
 *               password:
 *                 type: string
 *                 example: "SenhaSegura123"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas (email ou senha incorretos)
 */

router.post('/', loginController);

export default router;
