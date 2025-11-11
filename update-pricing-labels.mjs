import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updatePricingLabels() {
  console.log('Starting to update pricing labels...');

  try {
    // Get all umrah offers
    const offers = await prisma.umrahOffer.findMany();

    console.log(`Found ${offers.length} offers to update`);

    for (const offer of offers) {
      // Map old Arabic labels to new English keys
      const updatedPricing = offer.pricing.map((tier) => {
        let newLabel = tier.label;
        
        // Map Arabic labels to English keys
        if (tier.label === 'فردي' || tier.label === 'غرفة فردية') {
          newLabel = 'single';
        } else if (tier.label === 'ثنائي' || tier.label === 'غرفة ثنائية' || tier.label === 'غرفة ثنائية (للشخص)') {
          newLabel = 'double';
        } else if (tier.label === 'ثلاثي' || tier.label === 'غرفة ثلاثية' || tier.label === 'غرفة ثلاثية (للشخص)') {
          newLabel = 'triple';
        }

        return {
          ...tier,
          label: newLabel
        };
      });

      // Update the offer
      await prisma.umrahOffer.update({
        where: { id: offer.id },
        data: { pricing: updatedPricing }
      });

      console.log(`✓ Updated offer: ${offer.title}`);
    }

    console.log('\n✅ All offers updated successfully!');
  } catch (error) {
    console.error('❌ Error updating offers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePricingLabels();
