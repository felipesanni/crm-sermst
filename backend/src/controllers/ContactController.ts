import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ContactController {
  list = async (request: Request, response: Response) => {
    try {
      const { userId } = request;
      
      const contacts = await prisma.contact.findMany({
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

      return response.json(contacts);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar contatos' });
    }
  }

  show = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { userId } = request;

      const contact = await prisma.contact.findFirst({
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

      if (!contact) {
        return response.status(404).json({ error: 'Contato não encontrado' });
      }

      return response.json(contact);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar contato' });
    }
  }

  create = async (request: Request, response: Response) => {
    try {
      const { name, email, phone, status, source, notes } = request.body;
      const { userId } = request;

      const contact = await prisma.contact.create({
        data: {
          name,
          email,
          phone,
          status,
          source,
          notes,
          userId
        }
      });

      return response.status(201).json(contact);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar contato' });
    }
  }

  update = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { name, email, phone, status, source, notes } = request.body;
      const { userId } = request;

      const contactExists = await prisma.contact.findFirst({
        where: {
          id,
          userId
        }
      });

      if (!contactExists) {
        return response.status(404).json({ error: 'Contato não encontrado' });
      }

      const contact = await prisma.contact.update({
        where: { id },
        data: {
          name,
          email,
          phone,
          status,
          source,
          notes
        }
      });

      return response.json(contact);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar contato' });
    }
  }

  delete = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { userId } = request;

      const contactExists = await prisma.contact.findFirst({
        where: {
          id,
          userId
        }
      });

      if (!contactExists) {
        return response.status(404).json({ error: 'Contato não encontrado' });
      }

      await prisma.contact.delete({
        where: { id }
      });

      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao deletar contato' });
    }
  }
}
