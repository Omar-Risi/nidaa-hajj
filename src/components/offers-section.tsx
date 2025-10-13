'use client';
import Image from "next/image";
import { Box, User, Users, Book, Info, X } from "lucide-react";
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
  content?: string;
  description?: string;
  features?: string[];
  duration?: string;
  accommodation?: string;
  image: string;
  images?: string[]; // Array of images for carousel
  pricing: PricingTier[];
}

export default function OffersSection() {
  const [selectedCard, setSelectedCard] = useState<OfferCard | null>(null);
  const [activeTab, setActiveTab] = useState<'umrah' | 'hajj'>('umrah');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Carousel navigation handlers
  const handlePrevImage = () => {
    if (selectedCard?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedCard.images!.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedCard?.images) {
      setCurrentImageIndex((prev) =>
        prev === selectedCard.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Reset image index when modal opens
  const openModal = (card: OfferCard) => {
    setCurrentImageIndex(0);
    setSelectedCard(card);
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

                  <p>
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
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openModal(card)}
                      className="flex-1 py-3 bg-foreground text-white font-semibold rounded-lg transition-all duration-200 hover:bg-foreground/90 flex items-center justify-center gap-2"
                    >
                      <Info className="w-4 h-4" />
                      التفاصيل
                    </motion.button>
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

      {/* Professional Modal Popup with Carousel */}
      <AnimatePresence>
        {selectedCard && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setSelectedCard(null)}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header with Image Carousel */}
                <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
                  {/* Carousel Images */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={selectedCard.images?.[currentImageIndex] || selectedCard.image}
                        alt={`${selectedCard.title} - Image ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

                  {/* Navigation Arrows - Only show if multiple images */}
                  {selectedCard.images && selectedCard.images.length > 1 && (
                    <>
                      {/* Previous Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage();
                        }}
                        onTouchEnd={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handlePrevImage();
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-white active:bg-white flex items-center justify-center transition-all shadow-xl z-20 touch-manipulation"
                        aria-label="Previous image"
                      >
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      {/* Next Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage();
                        }}
                        onTouchEnd={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleNextImage();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-white active:bg-white flex items-center justify-center transition-all shadow-xl z-20 touch-manipulation"
                        aria-label="Next image"
                      >
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Image Indicators */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
                        {selectedCard.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(index);
                            }}
                            onTouchEnd={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setCurrentImageIndex(index);
                            }}
                            className={`h-2.5 rounded-full transition-all touch-manipulation ${index === currentImageIndex
                              ? 'bg-white w-8'
                              : 'bg-white/60 hover:bg-white/80 w-2.5'
                              }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Close Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCard(null);
                    }}
                    className="absolute top-4 left-4 sm:right-4 sm:left-auto w-12 h-12 rounded-full bg-white/95 hover:bg-white flex items-center justify-center transition-colors shadow-xl z-20"
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6 text-foreground" />
                  </button>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 pointer-events-none">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">{selectedCard.title}</h3>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-18rem)] sm:max-h-[calc(90vh-22rem)] md:max-h-[calc(90vh-26rem)]">
                  {/* Description */}
                  {selectedCard.description && (
                    <div className="mb-6">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {selectedCard.description}
                      </p>
                    </div>
                  )}

                  {/* Duration and Accommodation Grid */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {selectedCard.duration && (
                      <div className="bg-gradient-to-br from-gold-start/10 to-gold-end/10 rounded-xl p-4 border border-gold-start/20">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-gold-start" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-semibold text-foreground">المدة</span>
                        </div>
                        <p className="text-gray-700">{selectedCard.duration}</p>
                      </div>
                    )}

                    {selectedCard.accommodation && (
                      <div className="bg-gradient-to-br from-gold-start/10 to-gold-end/10 rounded-xl p-4 border border-gold-start/20">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-gold-start" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span className="font-semibold text-foreground">الإقامة</span>
                        </div>
                        <p className="text-gray-700">{selectedCard.accommodation}</p>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  {selectedCard.features && selectedCard.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-start to-gold-end flex items-center justify-center">
                          <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        ما يتضمنه العرض
                      </h4>
                      <ul className="space-y-3">
                        {selectedCard.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <div className="mt-1 w-5 h-5 rounded-full bg-gold-start/20 flex items-center justify-center flex-shrink-0">
                              <svg className="w-3 h-3 text-gold-start" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="leading-relaxed">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pricing Section */}
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-xl font-bold text-foreground mb-4">الأسعار</h4>
                    <div className="space-y-3">
                      {selectedCard.pricing.map((tier, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                              {getPricingIcon(tier.icon)}
                            </div>
                            <span className="font-semibold text-gray-700">{tier.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold golden-text">{tier.price}</span>
                            <span className="text-gray-500">ر.ع</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.a
                    href={`https://wa.me/+96897477488?text=انا مهتم في هذا العرض : ${selectedCard.title}`}
                    target="_blank"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full mt-6 py-4 bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center"
                  >
                    احجز الآن
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
