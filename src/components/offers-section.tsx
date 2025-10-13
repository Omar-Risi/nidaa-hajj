'use client';
import Image from "next/image";
import Link from "next/link";
import { Box, User, Users, Book, Info } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { umrahOffers } from "../data/offers";

// Types for offer data
interface PricingTier {
  icon: 'single' | 'double' | 'triple';
  price: number;
  label: string;
}

interface OfferCard {
  id: number;
  title: string;
  content?: string;
  description?: string;
  features?: string[];
  duration?: string;
  accommodation?: string;
  image: string;
  images?: string[];
  pricing: PricingTier[];
}

export default function OffersSection() {
  const [activeTab, setActiveTab] = useState<'umrah' | 'hajj'>('umrah');

  // Umrah Packages Data
  const umrahPackages: OfferCard[] = umrahOffers;

  const getPricingIcon = (type: 'single' | 'double' | 'triple') => {
    switch (type) {
      case 'single':
        return <User className="w-4 h-4" />;
      case 'double':
        return <Users className="w-4 h-4" />;
      case 'triple':
        return (
          <div className="flex items-center -space-x-1">
            <User className="w-3 h-3" />
            <User className="w-3 h-3" />
            <User className="w-3 h-3" />
          </div>
        );
    }
  };

  return (
    <section id="offers" className="mt-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            برامجنا المتاحة
          </h2>
          <p className="text-gray-600 text-lg">
            اختر البرنامج الأنسب لك
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('umrah')}
            className={`
              px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300
              ${activeTab === 'umrah'
                ? 'bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            <Book className="w-5 h-5 inline-block ml-2" />
            برامج العمرة
          </button>
          <button
            onClick={() => setActiveTab('hajj')}
            className={`
              px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300
              ${activeTab === 'hajj'
                ? 'bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            <Box className="w-5 h-5 inline-block ml-2" />
            برامج الحج
          </button>
        </div>

        {/* Content Grid */}
        {activeTab === 'umrah' ? (
          <motion.div
            key="umrah"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {umrahPackages.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">{card.title}</h3>

                  <p className="text-gray-600 mb-4">
                    {card.content}
                  </p>

                  {/* Pricing */}
                  <div className="space-y-3">
                    {card.pricing.map((tier, tierIndex) => (
                      <motion.div
                        key={tierIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1 + tierIndex * 0.1
                        }}
                        className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
                      >
                        <div className="flex items-center gap-2 text-gray-600">
                          {getPricingIcon(tier.icon)}
                          <span className="text-sm">{tier.label}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold golden-text">{tier.price}</span>
                          <span className="text-sm text-gray-500">ر.ع</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <Link href={`/offers/${card.id}`} className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 bg-foreground text-white font-semibold rounded-lg transition-all duration-200 hover:bg-foreground/90 flex items-center justify-center gap-2"
                      >
                        <Info className="w-4 h-4" />
                        التفاصيل
                      </motion.button>
                    </Link>
                    <a className="flex-[2] flex" href={`https://wa.me/+96897477488?text=انا مهتم في هذا العرض : ${card.title}`} target="_blank">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-3 bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground font-semibold rounded-lg transition-all duration-200"
                      >
                        احجز الآن
                      </motion.button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="hajj"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-20 max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-start/20 to-gold-end/20 flex items-center justify-center mb-6">
              <Box className="w-12 h-12 text-gold-start" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-center">
              برامج الحج قريباً
            </h3>
            <p className="text-gray-600 text-lg text-center mb-8 leading-relaxed">
              نحن نعمل حالياً على تجهيز برامج الحج المتميزة لكم.<br />
              تابعونا للإعلان عنها قريباً إن شاء الله.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+96897477488"
                className="px-6 py-3 bg-foreground text-white font-semibold rounded-lg hover:bg-foreground/90 transition-colors"
              >
                اتصل للاستفسار
              </a>
              <a
                href="https://wa.me/96897477488"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-gold-start to-gold-end text-foreground font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                تواصل عبر واتساب
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}