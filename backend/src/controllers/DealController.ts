import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class DealController {
  list = async (request: Request, response: Response) => {
    try {
      const { userId } = request;
      
      const deals = await prisma.$transaction(async (tx) => {
        const result = await tx.deal.findMany({
          where: {
            userId,
            NOT: {
              status: 'fechado'
            }
          },
          select: {
            id: true,
            title: true,
            value: true,
            status: true,
            priority: true,
            closeDate: true,
            client: {
              select: {
                id: true,
                name: true,
                company: true
              }
            },
            contact: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          orderBy: {
            updatedAt: 'desc'
          },
          take: 50
        });

        return result;
      });

      return response.json(deals);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao listar negócios' });
    }
  }

  show = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { userId } = request;

      const deal = await prisma.deal.findFirst({
        where: {
          id,
          userId
        },
        include: {
          client: {
            select: {
              id: true,
              name: true,
              company: true
            }
          },
          contact: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      if (!deal) {
        return response.status(404).json({ error: 'Negócio não encontrado' });
      }

      return response.json(deal);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar negócio' });
    }
  }

  create = async (request: Request, response: Response) => {
    try {
      const { 
        title, 
        value, 
        status, 
        priority, 
        closeDate, 
        description,
        clientId,
        contactId
      } = request.body;
      const { userId } = request;

      const deal = await prisma.deal.create({
        data: {
          title,
          value,
          status,
          priority,
          closeDate: closeDate ? new Date(closeDate) : null,
          description,
          clientId,
          contactId,
          userId
        },
        include: {
          client: {
            select: {
              id: true,
              name: true,
              company: true
            }
          },
          contact: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      return response.status(201).json(deal);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao criar negócio' });
    }
  }

  update = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { 
        title, 
        value, 
        status, 
        priority, 
        closeDate, 
        description,
        clientId,
        contactId
      } = request.body;
      const { userId } = request;

      const dealExists = await prisma.deal.findFirst({
        where: {
          id,
          userId
        }
      });

      if (!dealExists) {
        return response.status(404).json({ error: 'Negócio não encontrado' });
      }

      const deal = await prisma.deal.update({
        where: { id },
        data: {
          title,
          value,
          status,
          priority,
          closeDate: closeDate ? new Date(closeDate) : null,
          description,
          clientId,
          contactId
        },
        include: {
          client: {
            select: {
              id: true,
              name: true,
              company: true
            }
          },
          contact: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      return response.json(deal);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao atualizar negócio' });
    }
  }

  delete = async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { userId } = request;

      const dealExists = await prisma.deal.findFirst({
        where: {
          id,
          userId
        }
      });

      if (!dealExists) {
        return response.status(404).json({ error: 'Negócio não encontrado' });
      }

      await prisma.deal.delete({
        where: { id }
      });

      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao deletar negócio' });
    }
  }
}
