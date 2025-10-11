'use client';

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { Tag, Box, Footprints, User, Users } from "lucide-react";
import { useState } from "react";

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

export default function Home() {
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
    <>
      <section className="w-full max-h-screen overflow-hidden flex relative">
        <div className="flex-1 relative flex">
          <div className="bg-black/50 w-full h-full absolute z-10"></div>
          <Image
            src="/hero-bg.jpg"
            alt="Hero Background"
            width={1920}
            height={1080}
            className="flex-1 object-cover"
          />

          {/* Hero Content - Centered */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
            {/* H1 with Golden Text and Neon Glow */}
            <div className="relative mb-8">
              {/* Blurred glow background */}
              <div className="absolute inset-0 blur-3xl bg-gold-start opacity-60 scale-110"></div>

              {/* Main heading */}
              <h1 className="relative golden-text text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight">
                نحن هنا حيث لا يشبهنا شيء
              </h1>
            </div>

            {/* Button */}
            <Link
              href="#offers"
              className="relative bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground px-8 py-4 rounded-lg text-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl"
            >
              إبدأ بالحجز
            </Link>
          </div>
        </div>
      </section>

      {/* Button Section - Aligned with navbar */}
      <section id="offers" className="mt-16">
        <div className="container mx-auto px-4">
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

          {/* Content Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getCurrentData().map((card) => (
              <div key={card.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                    {card.pricing.map((tier, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                        <div className="flex items-center gap-2 text-gray-600">
                          {getPricingIcon(tier.icon)}
                          <span className="text-sm">{tier.label}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold golden-text">{tier.price}</span>
                          <span className="text-sm text-gray-500">ر.ع</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Book Button */}
                  <button className="w-full mt-6 py-3 bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground font-semibold rounded-lg hover:scale-105 transition-transform duration-200">
                    احجز الآن
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
