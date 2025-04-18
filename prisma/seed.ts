import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.upsert({
        where: {email: 'admin@gmail.com'},
        update: {},
        create: {
            name: 'Admin',
            email: 'admin@gmail.com',
            password: 'admin123',
            isAdmin: true,
        }
    });

    console.log(`User created: ${admin.name}`);

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })