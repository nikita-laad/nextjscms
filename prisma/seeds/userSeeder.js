const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function seed() {
  try {
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the manually provided salt
    const hashedPassword = await bcrypt.hash('Admin@123', salt);

    await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@gmail.com',
        mobile: '987654321',
        password: hashedPassword,
        status: 1, // 1 for active, 0 for inactive
      },
    });

    console.log('Seeding completed.');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();