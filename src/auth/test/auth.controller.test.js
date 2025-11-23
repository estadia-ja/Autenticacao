import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loginController } from '../controller.js'; 
import { loginService } from '../service.js';

vi.mock('../service.js');

describe('Login Controller', () => {
    let req;
    let res;

    beforeEach(() => {
        vi.clearAllMocks();
        
        req = {
            body: {
                email: 'teste@email.com',
                password: '123'
            }
        };
        
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
    });

    it('deve retornar 200 e o token em caso de sucesso', async () => {
        const mockResponse = { token: 'abc-123', userId: 1 };
        loginService.mockResolvedValue(mockResponse);

        await loginController(req, res);

        expect(loginService).toHaveBeenCalledWith('teste@email.com', '123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('deve retornar 401 e mensagem de erro quando o service falhar', async () => {
        // Arrange
        const errorMessage = 'Email ou senha inválidos.';
        // Simulamos que o service lançou um erro
        loginService.mockRejectedValue(new Error(errorMessage));

        // Act
        await loginController(req, res);

        // Assert
        expect(loginService).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});