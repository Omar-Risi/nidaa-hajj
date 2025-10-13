'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { User, Users, Info, X, Calendar, Hotel, Plane, CheckCircle2, ArrowRight, Book, Box } from "lucide-react";
import { Footer } from "@/components/footer";

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
      highlight: "عرض رمضان المميز",
      features: [
        "السفر على الطيران العماني",
        "فندق ساعة مكة فيرمونت في مكة، مع بوفيه فطور",
        "فندق مادن في المدينة، مع بوفيه فطور",
        "التنقل من المدينة إلى مكة بالقطار",
        "حافلات حديثة للاستقبال والتوديع في المطارات ومحطات القطار",
        "شاحنة لنقل الأمتعة من المدينة إلى مكة، لتجد أمتعتك في انتظارك حين تصل مكة",
        "خدمات راقية ومتعددة تليق بمعتمرينا",
      ],
      image: "/hero-bg.jpg",
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
      image: "/hero-bg.jpg",
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
      <section className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] flex items-center justify-center overflow-hidden">
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

      {/* Offers Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              عروضنا المتاحة
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              برامج متكاملة تجمع بين الفخامة والروحانية، صممت خصيصاً لتلبية احتياجاتكم وتوفير أفضل تجربة ممكنة
            </p>

            {/* Tab Buttons */}
            <div className="flex justify-center gap-4">
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
          </motion.div>

          {/* Offers Grid */}
          {activeTab === 'umrah' ? (
            <motion.div
              key="umrah"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto"
            >
              {umrahPackages.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    {/* Image with Overlay */}
                    <div className="relative h-64 sm:h-80 overflow-hidden">
                      <Image
                        src={offer.image}
                        alt={offer.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* Highlight Badge */}
                      {offer.highlight && (
                        <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-gold-start to-gold-end rounded-full">
                          <span className="text-foreground font-bold text-sm">{offer.highlight}</span>
                        </div>
                      )}

                      {/* Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                          {offer.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                      {/* Quick Info */}
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <Calendar className="w-5 h-5 text-gold-start flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">المدة</p>
                            <p className="text-sm font-semibold text-gray-700">6 ليالٍ / 7 أيام</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <Hotel className="w-5 h-5 text-gold-start flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500 mb-1">الإقامة</p>
                            <p className="text-sm font-semibold text-gray-700">فنادق 5 نجوم</p>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                        {offer.description}
                      </p>

                      {/* Pricing */}
                      <div className="bg-gradient-to-br from-gold-start/5 to-gold-end/5 rounded-xl p-5 mb-6">
                        <p className="text-sm text-gray-600 mb-3 font-semibold">الأسعار تبدأ من:</p>
                        <div className="space-y-3">
                          {offer.pricing.map((tier, tierIndex) => (
                            <div key={tierIndex} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                  {getPricingIcon(tier.icon)}
                                </div>
                                <span className="text-sm text-gray-700">{tier.label}</span>
                              </div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold golden-text">{tier.price}</span>
                                <span className="text-sm text-gray-500">ر.ع</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedCard(offer)}
                          className="flex-1 py-3.5 px-4 bg-foreground text-white font-semibold rounded-xl transition-all duration-200 hover:bg-foreground/90 flex items-center justify-center gap-2 shadow-md hover:
