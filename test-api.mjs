import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Testing database connection...');
  
  try {
    // Try to fetch news
    const news = await prisma.news.findMany();
    console.log('✅ Database connection successful!');
    console.log(`Found ${news.length} news items:`, news);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
