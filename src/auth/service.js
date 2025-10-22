import { prisma } from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function loginService(email, password) {
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if(!user) {
        throw new Error("Email ou senha inválidos.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        throw new Error("Email ou senha inválidos.");
    }

    const token = jwt.sign(
        {userId: user.id, email:user.email},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    );

    return token;
}