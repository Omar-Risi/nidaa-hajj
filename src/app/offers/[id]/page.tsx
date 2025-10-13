'use client';
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User, Users } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getOfferById } from "@/data/offers";
import { useParams } from "next/navigation";


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

// This would typically come from your params or database
// For now, using mock data

export default function OfferDetailsPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const params = useParams();
  const id = (params.id) ? params.id.toString() : '1';

  console.log(id)
  const offerData = getOfferById(parseInt(id));
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

  const handlePrevImage = () => {
    if (offerData?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? offerData.images!.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (offerData?.images) {
      setCurrentImageIndex((prev) =>
        prev === offerData.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link href="/#offers" className="inline-flex items-center gap-2 text-foreground hover:text-gold-start transition-colors">
            <ArrowRight className="w-5 h-5" />
            <span className="font-semibold">العودة للعروض</span>
          </Link>
        </div>
      </div>

      {/* Hero Image Carousel */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full overflow-hidden bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-full w-full"
          >
            <Image
              src={offerData.images?.[currentImageIndex] || offerData.image}
              alt={`${offerData.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Navigation Arrows */}
        {offerData.images && offerData.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-white flex items-center justify-center transition-all shadow-xl"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-white flex items-center justify-center transition-all shadow-xl"
              aria-label="Next image"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
              {offerData.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${index === currentImageIndex
                    ? 'bg-white w-8'
                    : 'bg-white/60 hover:bg-white/80 w-2.5'
                    }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="container mx-auto">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
              {offerData.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {offerData.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-4">نبذة عن العرض</h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {offerData.description}
                  </p>
                </motion.div>
              )}

              {/* Duration and Accommodation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                {offerData.duration && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-r-4 border-gold-start">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-start/20 to-gold-end/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-gold-start" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-foreground text-lg">المدة</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{offerData.duration}</p>
                  </div>
                )}

                {offerData.accommodation && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border-r-4 border-gold-start">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-start/20 to-gold-end/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-gold-start" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-foreground text-lg">الإقامة</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{offerData.accommodation}</p>
                  </div>
                )}
              </motion.div>

              {/* Features */}
              {offerData.features && offerData.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-start to-gold-end flex items-center justify-center">
                      <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    ما يتضمنه العرض
                  </h2>
                  <ul className="space-y-4">
                    {offerData.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="flex items-start gap-4 text-gray-700"
                      >
                        <div className="mt-1 w-6 h-6 rounded-full bg-gold-start/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3.5 h-3.5 text-gold-start" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="leading-relaxed text-lg">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Pricing */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">الأسعار</h2>
                <div className="space-y-4 mb-6">
                  {offerData.pricing.map((tier, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                            {getPricingIcon(tier.icon)}
                          </div>
                          <span className="font-semibold text-gray-700">{tier.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold golden-text">{tier.price}</span>
                          <span className="text-gray-500 text-sm">ر.ع</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Book Now Button */}
                <motion.a
                  href={`https://wa.me/+96897477488?text=انا مهتم في هذا العرض : ${offerData.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full py-4 bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-200 text-center"
                >
                  احجز الآن
                </motion.a>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center mb-3">
                    للاستفسار والحجز
                  </p>
                  <div className="space-y-2">
                    <a
                      href="tel:+96897477488"
                      className="flex items-center justify-center gap-2 text-foreground hover:text-gold-start transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="font-semibold">97477488</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
