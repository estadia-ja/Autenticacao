import { app } from './app.js';
import 'dotenv/config'; 

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Serviço de AUTENTICAÇÃO rodando na porta ${PORT}`);
    console.log(`📄 Documentação em http://localhost:${PORT}/docs`);
});