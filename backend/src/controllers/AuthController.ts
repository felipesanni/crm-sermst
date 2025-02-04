import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class AuthController {
  public login = async (request: Request, response: Response): Promise<void> => {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        response.status(400).json({
          status: 'error',
          message: 'Email e senha são obrigatórios',
        });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        response.status(401).json({
          status: 'error',
          message: 'Usuário não encontrado',
        });
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        response.status(401).json({
          status: 'error',
          message: 'Senha incorreta',
        });
        return;
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
      );

      const { password: _, ...userWithoutPassword } = user;

      response.json({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.error('Erro no login:', error);
      response.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor',
      });
    }
  };

  public register = async (request: Request, response: Response): Promise<void> => {
    try {
      const { name, email, password } = request.body;

      if (!name || !email || !password) {
        response.status(400).json({
          status: 'error',
          message: 'Todos os campos são obrigatórios',
        });
        return;
      }

      const userExists = await prisma.user.findUnique({
        where: { email },
      });

      if (userExists) {
        response.status(400).json({
          status: 'error',
          message: 'Usuário já existe',
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'user',
        },
      });

      const { password: _, ...userWithoutPassword } = user;

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
      );

      response.status(201).json({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      response.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor',
      });
    }
  };
}

export default new AuthController();
