'use client';

import Image from "next/image";
import { Tag, Box, Footprints, User, Users } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types for offer data
interface PricingTier {
  icon: 'single' | 'double' | 'triple';
  price: number;
  label: string;
}

interface OfferCard {
  id: number;
  title: string;
  image: string;
  pricing: PricingTier[];
}

export default function OffersSection() {
  const [activeSection, setActiveSection] = useState<'offers' | 'hajj' | 'omrah'>('offers');

  // Sample data - you can edit prices dynamically
  const offersData: OfferCard[] = [
    {
      id: 1,
      title: "عرض خاص",
      image: "/hero-bg.jpg",
      pricing: [
        { icon: 'single', price: 450, label: 'فرد واحد' },
        { icon: 'double', price: 800, label: 'شخصين' },
        { icon: 'triple', price: 1150, label: 'ثلاثة أشخاص' },
      ]
    },
    {
      id: 2,
      title: "عرض العائلة",
      image: "/hero-bg.jpg",
      pricing: [
        { icon: 'single', price: 500, label: 'فرد واحد' },
        { icon: 'double', price: 900, label: 'شخصين' },
        { icon: 'triple', price: 1250, label: 'ثلاثة أشخاص' },
      ]
    },
    {
      id: 3,
      title: "عرض VIP",
      image: "/hero-bg.jpg",
      pricing: [
        { icon: 'single', price: 750, label: 'فرد واحد' },
        { icon: 'double', price: 1400, label: 'شخصين' },
        { icon: 'triple', price: 2000, label: 'ثلاثة أشخاص' },
      ]
    },
  ];

  const hajjData: OfferCard[] = [
    {
      id: 1,
      title: "برنامج الحج الاقتصادي",
      image: "/hero-bg.jpg",
      pricing: [
        { icon: 'single', price: 2500, label: 'فرد واحد' },
        { icon: 'double', price: 4800, label: 'شخصين' },
        { icon: 'triple', price: 7000, label: 'ثلاثة أشخاص' },
      ]
    },
    {
      id: 2,
      title: "برنامج الحج المميز",
      image: "/hero-bg.jpg",
      pricing: [
        { icon: 'single', price: 3500, label: 'فرد واحد' },
        { icon: 'double', price: 6800, label: 'شخصين' },
        { icon: 'triple', price: 10000, label: 'ثلاثة أشخاص' },
      ]
    },
  ];

  const omrahData: OfferCard[] = [
    {
      id: 1,
      title: "عمرة رمضان",
      image: "/hero-bg.jpg",
      pricing: [
        { icon: 'single', price: 600, label: 'فرد واحد' },
        { icon: 'double', price: 1100, label: 'شخصين' },
        { icon: 'triple', price: 1550, label: 'ثلاثة أشخاص' },
      ]
    },
    {
      id: 2,
      title: "عمرة نهاية الأسبوع",
      image: "/hero-bg.jpg",
      pricing: [
        { icon: 'single', price: 400, label: 'فرد واحد' },
        { icon: 'double', price: 750, label: 'شخصين' },
        { icon: 'triple', price: 1050, label: 'ثلاثة أشخاص' },
      ]
    },
    {
      id: 3,
      title: "عمرة العشر من ذي الحجة",
      image: "/hero-bg.jpg",
      pricing: [
        { icon: 'single', price: 800, label: 'فرد واحد' },
        { icon: 'double', price: 1500, label: 'شخصين' },
        { icon: 'triple', price: 2100, label: 'ثلاثة أشخاص' },
      ]
    },
  ];

  const getCurrentData = () => {
    switch (activeSection) {
      case 'offers':
        return offersData;
      case 'hajj':
        return hajjData;
      case 'omrah':
        return omrahData;
      default:
        return offersData;
    }
  };

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
        {/* Tab Buttons */}
        <div className="flex items-center justify-center w-full flex-wrap gap-4">
          <button
            onClick={() => setActiveSection('offers')}
            className={`
              inline-flex items-center gap-2 
              px-6 py-3 
              rounded-full 
              font-medium
              transition-all duration-300
              ${activeSection === 'offers' 
                ? 'bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground' 
                : 'bg-foreground text-white hover:bg-gradient-to-r hover:from-gold-start hover:via-gold-end hover:to-gold-start hover:text-foreground'
              }
            `}
          >
            <Tag className="w-5 h-5" />
            <span>العروض</span>
          </button>
          
          <button
            onClick={() => setActiveSection('hajj')}
            className={`
              inline-flex items-center gap-2 
              px-6 py-3 
              rounded-full 
              font-medium
              transition-all duration-300
              ${activeSection === 'hajj' 
                ? 'bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground' 
                : 'bg-foreground text-white hover:bg-gradient-to-r hover:from-gold-start hover:via-gold-end hover:to-gold-start hover:text-foreground'
              }
            `}
          >
            <Box className="w-5 h-5" />
            <span>برامج الحج</span>
          </button>
          
          <button
            onClick={() => setActiveSection('omrah')}
            className={`
              inline-flex items-center gap-2 
              px-6 py-3 
              rounded-full 
              font-medium
              transition-all duration-300
              ${activeSection === 'omrah' 
                ? 'bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground' 
                : 'bg-foreground text-white hover:bg-gradient-to-r hover:from-gold-start hover:via-gold-end hover:to-gold-start hover:text-foreground'
              }
            `}
          >
            <Footprints className="w-5 h-5" />
            <span>برامج العمرة</span>
          </button>
        </div>

        {/* Content Grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {getCurrentData().map((card, index) => (
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

                  {/* Book Button */}
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground font-semibold rounded-lg transition-all duration-200"
                  >
                    احجز الآن
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
