import { loginService } from "./service.js";

export async function loginController(req, res){
    try {
        const { email, password } = req.body;

        const { token, userId } = await loginService(email, password);

        res.status(200).json({ token: token, userId: userId });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}