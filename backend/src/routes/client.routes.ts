import { Router } from 'express';
import { ClientController } from '../controllers/ClientController';

const clientRoutes = Router();
const clientController = new ClientController();

// Listar todos os clientes do usuário
clientRoutes.get('/', clientController.list);

// Buscar cliente específico
clientRoutes.get('/:id', clientController.show);

// Criar novo cliente
clientRoutes.post('/', clientController.create);

// Atualizar cliente
clientRoutes.put('/:id', clientController.update);

// Deletar cliente
clientRoutes.delete('/:id', clientController.delete);

export { clientRoutes };
