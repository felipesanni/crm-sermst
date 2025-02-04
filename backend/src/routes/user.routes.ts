import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRoutes = Router();
const userController = new UserController();

// Listar todos os usuários
userRoutes.get('/', userController.list);

// Buscar usuário específico
userRoutes.get('/:id', userController.show);

// Atualizar usuário
userRoutes.put('/:id', userController.update);

// Deletar usuário
userRoutes.delete('/:id', userController.delete);

export { userRoutes };
