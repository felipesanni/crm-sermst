import { Router } from 'express';
import { ContactController } from '../controllers/ContactController';

const contactRoutes = Router();
const contactController = new ContactController();

// Listar todos os contatos do usuário
contactRoutes.get('/', contactController.list);

// Buscar contato específico
contactRoutes.get('/:id', contactController.show);

// Criar novo contato
contactRoutes.post('/', contactController.create);

// Atualizar contato
contactRoutes.put('/:id', contactController.update);

// Deletar contato
contactRoutes.delete('/:id', contactController.delete);

export { contactRoutes };
