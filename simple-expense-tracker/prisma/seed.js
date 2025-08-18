import { PrismaClient } from '../src/generated/prisma/client.js'

const prisma = new PrismaClient()

async function main() {
    // await prisma.expense.deleteMany();
    // await prisma.category.deleteMany();

    const category = ['Food', 'Transport', 'Entertainment', 'Health', 'Education', 'Other'];
    await prisma.category.createMany({
        data: category.map((name) => ({name,})),
        skipDuplicates: true,
    });
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
