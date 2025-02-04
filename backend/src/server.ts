import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { contactRoutes } from './routes/contact.routes';
import { clientRoutes } from './routes/client.routes';
import { dealRoutes } from './routes/deal.routes';
import { errorHandler } from './middlewares/errorHandler';
import { swaggerDocs } from './swagger';
import { authMiddleware } from './middlewares/authMiddleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

// Documentação Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customCss: '.swagger-ui .topbar { display: none }',
}));

// Rotas públicas
app.use('/api/auth', authRoutes);

// Rotas protegidas
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/contacts', authMiddleware, contactRoutes);
app.use('/api/clients', authMiddleware, clientRoutes);
app.use('/api/deals', authMiddleware, dealRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`📚 Swagger documentation available at http://localhost:${port}/docs`);
});
