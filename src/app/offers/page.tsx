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
                          className="flex-1 py-3.5 px-4 bg-foreground text-white font-semibold rounded-xl transition-all duration-200 hover:bg-foreground/90 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        >
                          <Info className="w-4 h-4" />
                          التفاصيل الكاملة
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-[1.5] py-3.5 px-4 bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                          احجز الآن
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
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
              className="flex flex-col items-center justify-center py-20 max-w-3xl mx-auto"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold-start/20 to-gold-end/20 flex items-center justify-center mb-8">
                <Box className="w-16 h-16 text-gold-start" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
                برامج الحج قريبًا
              </h3>
              <p className="text-gray-600 text-xl text-center mb-10 leading-relaxed max-w-2xl">
                نحن نعمل حاليًا على تجهيز برامج الحج المتميزة لكم.<br />
                تابعونا للإعلان عنها قريبًا إن شاء الله.
              </p>
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 w-full">
                <h4 className="text-xl font-bold text-foreground mb-6 text-center">
                  هل تريد الاستفسار عن برامج الحج؟
                </h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+96897477488"
                    className="flex-1 px-6 py-4 bg-foreground text-white font-semibold rounded-xl hover:bg-foreground/90 transition-colors text-center shadow-md hover:shadow-lg"
                  >
                    اتصل للاستفسار
                  </a>
                  <a
                    href="https://wa.me/96897477488"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-gold-start to-gold-end text-foreground font-semibold rounded-xl hover:shadow-xl transition-all text-center shadow-lg"
                  >
                    تواصل عبر واتساب
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-foreground via-foreground/95 to-foreground rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto shadow-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                هل تحتاج إلى مساعدة في الاختيار؟
              </h3>
              <p className="text-white/80 text-lg mb-6">
                تواصل معنا وسيساعدك فريقنا في اختيار البرنامج الأنسب لك
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+96897477488"
                  className="px-8 py-4 bg-white text-foreground font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
                >
                  <span>اتصل بنا</span>
                  <span className="golden-text">97477488</span>
                </a>
                <a
                  href="https://wa.me/96897477488"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-gold-start to-gold-end text-foreground font-bold rounded-xl hover:shadow-xl transition-all"
                >
                  تواصل عبر واتساب
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Modal Popup */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCard(null)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image */}
            <div className="relative h-56 sm:h-72 w-full">
              <Image
                src={selectedCard.image}
                alt={selectedCard.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 left-4 sm:right-4 sm:left-auto w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-lg z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  {selectedCard.title}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-14rem)] sm:max-h-[calc(90vh-18rem)]">
              {/* Description */}
              <div className="mb-6 p-4 bg-gradient-to-r from-gold-start/10 to-gold-end/10 rounded-xl border-r-4 border-gold-start">
                <p className="text-gray-700 text-lg leading-relaxed font-semibold">
                  {selectedCard.description}
                </p>
              </div>

              {/* Duration and Accommodation */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-gold-start" />
                    <span className="font-bold text-foreground">الفترة والمدة</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">{selectedCard.duration}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Hotel className="w-5 h-5 text-gold-start" />
                    <span className="font-bold text-foreground">الإقامة</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">{selectedCard.accommodation}</p>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-start to-gold-end flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-foreground" />
                  </div>
                  ما يشمله البرنامج
                </h4>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {selectedCard.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <div className="mt-1 w-5 h-5 rounded-full bg-gold-start/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-gold-start" />
                      </div>
                      <span className="leading-relaxed text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Pricing Section */}
              <div className="border-t-2 border-gray-200 pt-6">
                <h4 className="text-xl font-bold text-foreground mb-5">الأسعار</h4>
                <div className="space-y-3">
                  {selectedCard.pricing.map((tier, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-gold-start/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-start/20 to-gold-end/20 flex items-center justify-center">
                          {getPricingIcon(tier.icon)}
                        </div>
                        <span className="font-semibold text-gray-700">{tier.label}</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold golden-text">{tier.price}</span>
                        <span className="text-gray-500 font-semibold">ر.ع</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 py-4 bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground font-bold rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                احجز هذا البرنامج الآن
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
}
