import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class UserController {
  list = async (request: Request, response: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return response.json(users);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }

  show = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!user) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      return response.json(user);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  update = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { name, email, password, role } = request.body;

      const userExists = await prisma.user.findUnique({
        where: { id }
      });

      if (!userExists) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      const data: any = {};
      
      if (name) data.name = name;
      if (email) data.email = email;
      if (password) data.password = await bcrypt.hash(password, 10);
      if (role) data.role = role;

      const user = await prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return response.json(user);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  delete = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const userExists = await prisma.user.findUnique({
        where: { id }
      });

      if (!userExists) {
        return response.status(404).json({ error: 'Usuário não encontrado' });
      }

      await prisma.user.delete({
        where: { id }
      });

      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
}
