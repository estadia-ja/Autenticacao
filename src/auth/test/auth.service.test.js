import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loginService } from '../service.js';
import { prisma } from '../../config/database.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

vi.mock('../../config/database.js', () => ({
    prisma: {
        user: {
            findUnique: vi.fn(),
        },
    },
}));

vi.mock('bcrypt');
vi.mock('jsonwebtoken');

describe('Login Service', () => {
    beforeEach(() => {
        vi.clearAllMocks(); 
    });

    it('deve retornar token e userId quando as credenciais forem válidas', async () => {
        const mockUser = { id: 1, email: 'teste@email.com', password: 'hashedPassword' };
        const mockToken = 'token_jwt_valido';

        prisma.user.findUnique.mockResolvedValue(mockUser); 
        bcrypt.compare.mockResolvedValue(true); 
        jwt.sign.mockReturnValue(mockToken);

        const result = await loginService('teste@email.com', '123456');

        // Assert (Verificação)
        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'teste@email.com' } });
        expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'hashedPassword');
        expect(result).toEqual({ token: mockToken, userId: 1 });
    });

    it('deve lançar erro se o usuário não for encontrado', async () => {
        prisma.user.findUnique.mockResolvedValue(null); 

        await expect(loginService('errado@email.com', '123456'))
            .rejects
            .toThrow('Email ou senha inválidos.');
    });

    it('deve lançar erro se a senha estiver incorreta', async () => {
        const mockUser = { id: 1, email: 'teste@email.com', password: 'hashedPassword' };
        
        prisma.user.findUnique.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(false); 

        await expect(loginService('teste@email.com', 'senhaErrada'))
            .rejects
            .toThrow('Email ou senha inválidos.');
    });
});