import { Router, RequestHandler } from 'express';
import AuthController from '../controllers/AuthController';

const authRoutes = Router();

authRoutes.post('/login', AuthController.login as RequestHandler);
authRoutes.post('/register', AuthController.register as RequestHandler);

export { authRoutes };
