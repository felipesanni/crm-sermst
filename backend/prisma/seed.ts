import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Limpar tabela de usuários
    await prisma.user.deleteMany();

    // Criar usuário admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.user.create({
      data: {
        name: 'Administrador',
        email: 'admin@crm.com',
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('✅ Usuário admin criado com sucesso');
    console.log({
      email: admin.email,
      senha: 'admin123'
    });

  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
