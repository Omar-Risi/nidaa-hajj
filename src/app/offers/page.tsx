'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { User, Users, Info, X, Calendar, Hotel, Plane, CheckCircle2, ArrowRight, Book, Box } from "lucide-react";
import { Footer } from "@/components/footer";
import OffersSection from "@/components/offers-section";

// Types for offer data
interface PricingTier {
  icon: 'single' | 'double' | 'triple';
  price: number;
  label: string;
}

interface OfferCard {
  id: number;
  title: string;
  description: string;
  duration: string;
  accommodation: string;
  features: string[];
  image: string;
  pricing: PricingTier[];
  highlight?: string;
  images: string[]
}

export default function OffersPage() {
  const [selectedCard, setSelectedCard] = useState<OfferCard | null>(null);
  const [activeTab, setActiveTab] = useState<'umrah' | 'hajj'>('umrah');

  // Umrah Packages Data
  const umrahPackages: OfferCard[] = [
    {
      id: 1,
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
      images: ["/madden-hotel-1.jpeg", "/madden-hotel-2.jpeg", "/madden-hotel-3.jpeg", "/vermont-hotel-1.jpeg", "/vermont-hotel-2.jpeg", "/vermont-hotel-3.jpeg", "/vermont-hotel-4.jpeg"], // Carousel images
      pricing: [
        { icon: 'single', price: 1310, label: 'غرفة فردية' },
        { icon: 'double', price: 785, label: 'غرفة ثنائية (للشخص)' },
        { icon: 'triple', price: 680, label: 'غرفة ثلاثية (للشخص)' },
      ]
    },
    {
      id: 2,
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
      images: ["/madden-hotel-1.jpeg", "/madden-hotel-2.jpeg", "/madden-hotel-3.jpeg", "/vermont-hotel-1.jpeg", "/vermont-hotel-2.jpeg", "/vermont-hotel-3.jpeg", "/vermont-hotel-4.jpeg"], // Carousel images
      pricing: [
        { icon: 'single', price: 860, label: 'غرفة فردية' },
        { icon: 'double', price: 555, label: 'غرفة ثنائية (للشخص)' },
        { icon: 'triple', price: 500, label: 'غرفة ثلاثية (للشخص)' },
      ]
    },
  ];
  const getPricingIcon = (type: 'single' | 'double' | 'triple') => {
    switch (type) {
      case 'single':
        return <User className="w-5 h-5" />;
      case 'double':
        return <Users className="w-5 h-5" />;
      case 'triple':
        return (
          <div className="flex items-center -space-x-1">
            <User className="w-4 h-4" />
            <User className="w-4 h-4" />
            <User className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[100vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Offers Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-gold-start/20 to-gold-end/20 border border-gold-start/50 rounded-full mb-6 backdrop-blur-sm">
              <Plane className="w-5 h-5 text-gold-start" />
              <span className="golden-text text-lg font-semibold">العروض الخاصة</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              برامج العمرة المميزة
              <span className="block golden-text mt-3">لموسم 2026</span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              اختر البرنامج الأنسب لك واحجز رحلتك الإيمانية مع حملة النداء
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 text-white/80"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gold-start" />
                <span>22 عاماً من الخبرة</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gold-start" />
                <span>فنادق 5 نجوم</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gold-start" />
                <span>خدمة متميزة</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <OffersSection />

      <div className="mt-[75]"></div>

      <Footer />
    </>
  );
}
