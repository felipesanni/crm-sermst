import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Criar usuário admin padrão
    const adminExists = await prisma.user.findFirst({
      where: {
        email: 'admin@crm.com',
      },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await prisma.user.create({
        data: {
          name: 'Administrador',
          email: 'admin@crm.com',
          password: hashedPassword,
          role: 'admin',
        },
      });

      console.log('✅ Usuário admin criado com sucesso');
      console.log('Email: admin@crm.com');
      console.log('Senha: admin123');
    }
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
