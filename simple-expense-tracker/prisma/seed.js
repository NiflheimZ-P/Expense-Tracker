import { PrismaClient } from '../src/generated/prisma/client.js';

const prisma = new PrismaClient();
async function main() {
  // Truncate (delete all existing data)
  await prisma.expense.deleteMany();
  await prisma.category.deleteMany();
  // Seed categories
  const categoriesData = [
    { name: 'Food', description: 'Food & Drinks' },
    { name: 'Transport', description: 'Transportation & Travel' },
    { name: 'Entertainment', description: 'Movies, Games, etc.' },
    { name: 'Health', description: 'Medical & Fitness' },
    { name: 'Education', description: 'Books, Courses, Learning' },
    { name: 'Other', description: 'Miscellaneous' },
    { name: 'Shopping', description: 'Clothes, Electronics, etc.' },
    { name: 'Bills', description: 'Utilities & Subscriptions' },
  ];
  await prisma.category.createMany({
    data: categoriesData,
    skipDuplicates: true,
  });
  // Fetch created categories to use their IDs
  const allCategories = await prisma.category.findMany();
  // Helper to get random category id
  const getRandomCategoryId = () => {
    const randomIndex = Math.floor(Math.random() * allCategories.length);
    return allCategories[randomIndex].id;
  };
  // Seed 20 random expenses
  const expensesData = Array.from({ length: 20 }).map((_, i) => ({
    title: `Expense ${i + 1}`,
    amount: parseFloat((Math.random() * 100).toFixed(2)), // random amount 0-100
    date: new Date(
      Date.now() - Math.floor(Math.random() * 300) * 24 * 60 * 60 * 1000
    ), // random date in last 30 days
    categoryId: getRandomCategoryId(),
  }));
  await prisma.expense.createMany({
    data: expensesData,
  });
  console.log('Seed completed with 20 expenses!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
