'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  User, Users, Calendar, Hotel, CheckCircle2,
  ArrowRight, ArrowLeft, ChevronLeft, ChevronRight
} from "lucide-react";
import { Footer } from "@/components/footer";
import { getOfferById, type OfferCard } from "@/data/offers";

export default function OfferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const offerId = parseInt(params.id as string);
  const offerData = getOfferById(offerId);

  // Handle case where offer is not found - MUST BE BEFORE ANY HOOKS
  if (!offerData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            العرض غير موجود
          </h1>
          <p className="text-gray-600 mb-8">
            عذراً، لم نتمكن من العثور على العرض المطلوب
          </p>
          <button
            onClick={() => router.push('/offers')}
            className="px-8 py-3 bg-gradient-to-r from-gold-start to-gold-end text-foreground font-bold rounded-xl hover:shadow-xl transition-all"
          >
            العودة إلى العروض
          </button>
        </div>
      </div>
    );
  }

  // Now TypeScript knows offerData is not undefined
  return <OfferDetailContent offerData={offerData} router={router} />;
}

// Separate component that receives validated offerData
function OfferDetailContent({
  offerData,
  router
}: {
  offerData: OfferCard;
  router: ReturnType<typeof useRouter>
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = offerData.images || [offerData.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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
      {/* Hero Section with Image Gallery */}
      <section className="relative w-full h-[70vh] min-h-[500px] max-h-[700px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={images[currentImageIndex]}
            alt={`${offerData.title} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all shadow-lg"
              aria-label="Previous image"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all shadow-lg"
              aria-label="Next image"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75'
                    }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-12">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Back Button */}
              <button
                onClick={() => router.push('/offers')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6 hover:bg-white/20 transition-colors text-white"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة إلى العروض</span>
              </button>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {offerData.title}
              </h1>

              {offerData.content && (
                <p className="text-xl sm:text-2xl text-white/90 max-w-3xl">
                  {offerData.content}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {offerData.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-start to-gold-end flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-foreground" />
                    </div>
                    نبذة عن البرنامج
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {offerData.description}
                  </p>
                </motion.div>
              )}

              {/* Duration and Accommodation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid sm:grid-cols-2 gap-6"
              >
                {offerData.duration && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-gold-start" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">الفترة والمدة</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{offerData.duration}</p>
                  </div>
                )}

                {offerData.accommodation && (
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gold-start/10 flex items-center justify-center">
                        <Hotel className="w-6 h-6 text-gold-start" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">الإقامة</h3>
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
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-start to-gold-end flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-foreground" />
                    </div>
                    ما يشمله البرنامج
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {offerData.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <div className="mt-1 w-6 h-6 rounded-full bg-gold-start/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-gold-start" />
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Right Column - Pricing & CTA */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sticky top-8 space-y-6"
              >
                {/* Pricing Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-foreground mb-6">الأسعار</h3>
                  <div className="space-y-4 mb-8">
                    {offerData.pricing.map((tier, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200"
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
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground font-bold rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 mb-4"
                  >
                    احجز هذا البرنامج الآن
                    <ArrowLeft className="w-5 h-5" />
                  </motion.button>

                  {/* Contact Options */}
                  <div className="space-y-3 pt-6 border-t border-gray-200">
                    <p className="text-center text-gray-600 font-semibold mb-4">
                      أو تواصل معنا للاستفسار
                    </p>
                    <a
                      href="tel:+96897477488"
                      className="block w-full py-3 bg-foreground text-white font-semibold rounded-xl hover:bg-foreground/90 transition-colors text-center"
                    >
                      اتصل: 97477488
                    </a>
                    <a
                      href="https://wa.me/96897477488"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-center"
                    >
                      واتساب
                    </a>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-gradient-to-br from-gold-start/10 to-gold-end/10 rounded-2xl p-6 border border-gold-start/20">
                  <h4 className="font-bold text-foreground mb-3">معلومات مهمة</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-start mt-0.5 flex-shrink-0" />
                      <span>الأسعار شاملة جميع الخدمات المذكورة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-start mt-0.5 flex-shrink-0" />
                      <span>المقاعد محدودة - احجز مبكراً</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-start mt-0.5 flex-shrink-0" />
                      <span>تطبق الشروط والأحكام</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
