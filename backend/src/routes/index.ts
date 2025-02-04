import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import { contactRoutes } from './contact.routes';
import { clientRoutes } from './client.routes';
import { dealRoutes } from './deal.routes';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Rotas públicas
router.use('/auth', authRoutes);

// Rotas protegidas
router.use('/users', authMiddleware, userRoutes);
router.use('/contacts', authMiddleware, contactRoutes);
router.use('/clients', authMiddleware, clientRoutes);
router.use('/deals', authMiddleware, dealRoutes);

export { router };
