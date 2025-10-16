import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testNewsCreation() {
  console.log('Testing news creation...');
  
  try {
    const newsData = {
      title: 'Test News Title',
      date: new Date('2025-10-16'),
      content: 'This is test news content.',
    };
    
    console.log('Creating news with data:', newsData);
    
    const news = await prisma.news.create({
      data: newsData,
    });
    
    console.log('✅ News created successfully:', news);
    
    // Clean up - delete the test news
    await prisma.news.delete({
      where: { id: news.id },
    });
    console.log('✅ Test news cleaned up');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testNewsCreation();
