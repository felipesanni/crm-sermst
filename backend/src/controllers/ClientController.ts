import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ClientController {
  list = async (request: Request, response: Response) => {
    try {
      const { userId } = request;
      
      const clients = await prisma.client.findMany({
        where: {
          userId
        },
        include: {
          deals: {
            select: {
              id: true,
              title: true,
              status: true,
              value: true
            }
          }
        }
      });

      return response.json(clients);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar clientes' });
    }
  }

  show = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { userId } = request;

      const client = await prisma.client.findFirst({
        where: {
          id,
          userId
        },
        include: {
          deals: {
            select: {
              id: true,
              title: true,
              status: true,
              value: true
            }
          }
        }
      });

      if (!client) {
        return response.status(404).json({ error: 'Cliente não encontrado' });
      }

      return response.json(client);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar cliente' });
    }
  }

  create = async (request: Request, response: Response) => {
    try {
      const { name, email, phone, company, segment, address, status } = request.body;
      const { userId } = request;

      const client = await prisma.client.create({
        data: {
          name,
          email,
          phone,
          company,
          segment,
          address,
          status,
          userId
        }
      });

      return response.status(201).json(client);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar cliente' });
    }
  }

  update = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { name, email, phone, company, segment, address, status } = request.body;
      const { userId } = request;

      const clientExists = await prisma.client.findFirst({
        where: {
          id,
          userId
        }
      });

      if (!clientExists) {
        return response.status(404).json({ error: 'Cliente não encontrado' });
      }

      const client = await prisma.client.update({
        where: { id },
        data: {
          name,
          email,
          phone,
          company,
          segment,
          address,
          status
        }
      });

      return response.json(client);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  }

  delete = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { userId } = request;

      const clientExists = await prisma.client.findFirst({
        where: {
          id,
          userId
        }
      });

      if (!clientExists) {
        return response.status(404).json({ error: 'Cliente não encontrado' });
      }

      await prisma.client.delete({
        where: { id }
      });

      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao deletar cliente' });
    }
  }
}
