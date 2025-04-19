import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.upsert({
        where: {email: 'admin@gmail.com'},
        update: {},
        create: {
            name: 'Admin',
            email: 'admin@gmail.com',
            password: '$2b$10$ZT0T5Ik.zVDUth0a7/8zteOrWoSQQ0Mra1X/W/1Rna5madrokRY3i',
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