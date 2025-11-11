'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import OffersSection from "@/components/offers-section";
import { BadgeQuestionMark } from "lucide-react";
import { Footer } from "@/components/footer";
import NewsSection from "@/components/news-section";
import { useTranslation } from 'react-i18next';



export default function Home() {
  const { t } = useTranslation();

  // Smooth scroll handler
  const handleScrollToOffers = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const offersSection = document.getElementById('offers');
    if (offersSection) {
      offersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <>
      {/* Hero Section */}
      <section className="w-full h-screen max-h-screen overflow-hidden flex relative">
        <div className="flex-1 relative flex">
          <div className="bg-black/50 w-full h-full absolute z-10"></div>
          <Image
            src="/hero-bg.png"
            alt="Hero Background"
            width={1920}
            height={1080}
            className="flex-1 min-h-full object-cover"
          />

          {/* Hero Content - Centered */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
            {/* H1 with Golden Text and Neon Glow */}
            <div className="relative mb-8">
              {/* Blurred glow background */}
              <div className="absolute inset-0 blur-3xl bg-gold-start opacity-60 scale-110"></div>

              {/* Main heading */}
              <h1 className="relative golden-text text-2xl md:text-6xl lg:text-7xl font-bold text-center leading-tight py-6">
                {t('hero.title')} <br /> {t('hero.subtitle')}
              </h1>
              <p className="mt-8 text-white text-center font-bold">
                {t('hero.description')}
              </p>
            </div>

            {/* Button with smooth scroll */}
            <Link
              href="#offers"
              onClick={handleScrollToOffers}
              className="relative bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground px-8 py-4 rounded-lg text-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl"
            >
              {t('hero.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Offers Section Component */}
      <OffersSection />

      <NewsSection />

      {/* About Us Section - Redesigned */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-20 lg:mt-32 mb-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center gap-3 px-6 py-2.5 bg-gradient-to-r from-gold-start/10 via-gold-end/10 to-gold-start/10 border border-gold-start/30 rounded-full mb-6"
            >
              <BadgeQuestionMark className="w-5 h-5 text-gold-start" />
              <span className="golden-text text-lg font-semibold">{t('about.badge')}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight"
            >
              {t('about.title')}
              <span className="block golden-text mt-2">{t('about.subtitle')}</span>
            </motion.h2>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Main Content */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-1 h-16 bg-gradient-to-b from-gold-start to-gold-end rounded-full"></div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{t('about.companyName')}</h3>
                    <p className="text-gray-600 italic">{t('about.tagline')}</p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  {t('about.description1')} <span className="font-bold golden-text">{t('about.year')}</span>{t('about.description2')}
                </p>

                <div className="bg-gradient-to-r from-gold-start/5 to-gold-end/5 rounded-xl p-6 border-r-4 border-gold-start">
                  <p className="text-foreground font-semibold text-lg leading-relaxed">
                    &ldquo;{t('about.quote')}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Additional Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-foreground to-foreground/95 rounded-2xl shadow-xl p-8 lg:p-10 text-white">
                <h3 className="text-2xl font-bold golden-text mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-start to-gold-end flex items-center justify-center">
                    <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {t('about.visionTitle')}
                </h3>
                <p className="text-white/90 leading-relaxed text-lg mb-6">
                  {t('about.vision1')}
                </p>
                <p className="text-white/90 leading-relaxed text-lg">
                  {t('about.vision2')}
                </p>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-gold-start via-gold-end to-gold-start rounded-2xl shadow-xl p-8 lg:p-10">
                <p className="text-foreground text-xl lg:text-2xl font-bold text-center leading-relaxed">
                  {t('about.cta1')}
                  <span className="block mt-3 text-lg font-semibold">
                    {t('about.cta2')}
                  </span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Statistics/Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 lg:mt-16"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold golden-text mb-2">20+</div>
              <p className="text-gray-600 font-semibold">{t('about.stats.experience')}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold golden-text mb-2">1000+</div>
              <p className="text-gray-600 font-semibold">{t('about.stats.pilgrims')}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold golden-text mb-2">100%</div>
              <p className="text-gray-600 font-semibold">{t('about.stats.satisfaction')}</p>
            </div>
          </motion.div>
        </div>
      </motion.section>


      <Footer />
    </>
  );
}
