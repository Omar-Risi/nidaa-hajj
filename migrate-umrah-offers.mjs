import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const umrahOffers = [
  {
    title: "عمرة رمضان مع حملة النداء 1447هـ",
    description: "قال عليه الصلاة والسلام: 'عمرة في رمضان تعدل حجة معي' - اجمع شوق قلبك لعناق الحرمين وتعال معنا..",
    duration: "للفترة 7-13 من رمضان 1447هـ (25/2 - 3/3/2026م) | 3 ليال مدينة، و3 ليال مكة",
    accommodation: "مكة: فندق ساعة مكة فيرمونت | المدينة: فندق مادن",
    features: [
      "السفر على الطيران العماني",
      "فندق ساعة مكة فيرمونت في مكة، مع بوفيه فطور",
      "فندق مادن في المدينة، مع بوفيه فطور",
      "التنقل من المدينة إلى مكة بالقطار",
      "حافلات حديثة للاستقبال والتوديع في المطارات ومحطات القطار",
      "شاحنة لنقل الأمتعة من المدينة إلى مكة، لتجد أمتعتك في انتظارك حين تصل مكة",
      "خدمات راقية ومتعددة تليق بمعتمرينا",
    ],
    image: "/kaaba-1.jpg",
    images: [
      "/madden-hotel-1.jpeg",
      "/madden-hotel-2.jpeg",
      "/madden-hotel-3.jpeg",
      "/vermont-hotel-1.jpeg",
      "/vermont-hotel-2.jpeg",
      "/vermont-hotel-3.jpeg",
      "/vermont-hotel-4.jpeg"
    ],
    pricing: [
      { icon: 'triple', price: 680, label: 'غرفة ثلاثية (للشخص)' },
      { icon: 'double', price: 785, label: 'غرفة ثنائية (للشخص)' },
      { icon: 'single', price: 1310, label: 'غرفة فردية' },
    ]
  },
  {
    title: "عمرة منتصف العام الدراسي مع حملة النداء",
    description: "22 عاماً من الخبرة والتطوير، نترجمها واقعاً يجمع لكم بين الراحة والروحانية.. نحن نعتني بأدق التفاصيل لأنكم تستحقون الأفضل",
    duration: "الفترة 7-13/1/2026م | 3 ليال المدينة، و3 ليال مكة",
    accommodation: "في أفخم فنادق الخمس نجوم - مكة: فيرمونت | المدينة: مادن",
    features: [
      "السفر على الطيران العماني",
      "فندق ساعة مكة فيرمونت في مكة، مع بوفيه فطور",
      "فندق مادن في المدينة، مع بوفيه فطور",
      "جولة في المدينة لبعض الأماكن التاريخية",
      "التنقل من المدينة إلى مكة بالقطار",
      "حافلات حديثة مريحة لتنقلات المسافات الداخلية القصيرة",
      "شاحنة لنقل الأمتعة من المدينة إلى مكة",
      "خدمات راقية ومتعددة تليق بمعتمرينا",
    ],
    image: "/makkah-1.jpg",
    images: [
      "/madden-hotel-1.jpeg",
      "/madden-hotel-2.jpeg",
      "/madden-hotel-3.jpeg",
      "/vermont-hotel-1.jpeg",
      "/vermont-hotel-2.jpeg",
      "/vermont-hotel-3.jpeg",
      "/vermont-hotel-4.jpeg"
    ],
    pricing: [
      { icon: 'triple', price: 500, label: 'غرفة ثلاثية (للشخص)' },
      { icon: 'double', price: 555, label: 'غرفة ثنائية (للشخص)' },
      { icon: 'single', price: 860, label: 'غرفة فردية' },
    ]
  },
];

async function main() {
  console.log('🚀 Starting Umrah offers migration...\n');

  try {
    // Check if offers already exist
    const existingOffers = await prisma.umrahOffer.findMany();
    
    if (existingOffers.length > 0) {
      console.log(`⚠️  Found ${existingOffers.length} existing offer(s) in database.`);
      console.log('Do you want to delete them and insert fresh data? (This is a test script)');
      console.log('Deleting existing offers...\n');
      
      await prisma.umrahOffer.deleteMany();
      console.log('✅ Deleted existing offers\n');
    }

    // Insert new offers
    let successCount = 0;
    for (const offer of umrahOffers) {
      try {
        const created = await prisma.umrahOffer.create({
          data: offer,
        });
        console.log(`✅ Created: ${created.title}`);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to create offer: ${offer.title}`);
        console.error(error.message);
      }
    }

    console.log(`\n🎉 Migration completed! ${successCount}/${umrahOffers.length} offers created successfully.`);

    // Display created offers
    const allOffers = await prisma.umrahOffer.findMany({
      orderBy: { createdAt: 'desc' },
    });

    console.log('\n📋 Current offers in database:');
    allOffers.forEach((offer, index) => {
      console.log(`${index + 1}. ${offer.title}`);
      console.log(`   Duration: ${offer.duration}`);
      console.log(`   Features: ${offer.features.length} items`);
      console.log(`   Images: ${offer.images.length} items`);
      console.log(`   Pricing: ${JSON.stringify(offer.pricing).substring(0, 50)}...`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
