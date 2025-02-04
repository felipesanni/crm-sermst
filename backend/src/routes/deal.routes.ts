import { Router } from 'express';
import { DealController } from '../controllers/DealController';

const dealRoutes = Router();
const dealController = new DealController();

// Listar todos os negócios do usuário
dealRoutes.get('/', dealController.list);

// Buscar negócio específico
dealRoutes.get('/:id', dealController.show);

// Criar novo negócio
dealRoutes.post('/', dealController.create);

// Atualizar negócio
dealRoutes.put('/:id', dealController.update);

// Deletar negócio
dealRoutes.delete('/:id', dealController.delete);

export { dealRoutes };
