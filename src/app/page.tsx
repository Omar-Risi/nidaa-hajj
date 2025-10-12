'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import OffersSection from "@/components/offers-section";
import { BadgeQuestionMark } from "lucide-react";
import { Footer } from "@/components/footer";

export default function Home() {
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
            src="/hero-bg.jpg"
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
              <h1 className="relative golden-text text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight">
                نحن هنا حيث لا يشبهنا شيء
              </h1>
            </div>

            {/* Button with smooth scroll */}
            <Link
              href="#offers"
              onClick={handleScrollToOffers}
              className="relative bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground px-8 py-4 rounded-lg text-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl"
            >
              إبدأ بالحجز
            </Link>
          </div>
        </div>
      </section>

      {/* Offers Section Component */}
      <OffersSection />

      {/* About Us Section - Redesigned */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
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
              <span className="golden-text text-lg font-semibold">من نحن</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight"
            >
              اجمع شوق قلبك لعناق الحرمين
              <span className="block golden-text mt-2">وتعال معنا</span>
            </motion.h2>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-1 h-16 bg-gradient-to-b from-gold-start to-gold-end rounded-full"></div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">مؤسسة النداء للحج والعمرة</h3>
                    <p className="text-gray-600 italic">إعادة لتعريف الفخامة والإبداع</p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  تصقلها التجربة، وتنميها الخبرة، ويطورها التفكير الدؤوب. تأسست مؤسسة النداء عام <span className="font-bold golden-text">2003م</span>، وانطلقت تروي قصة الجمال في أعظم الرحلات الإيمانية.
                </p>

                <div className="bg-gradient-to-r from-gold-start/5 to-gold-end/5 rounded-xl p-6 border-r-4 border-gold-start">
                  <p className="text-foreground font-semibold text-lg leading-relaxed">
                    &ldquo;نحن هنا لأنكم تستحقون الأفضل، نبحر في ملكوت الجمال، لنصل حيث أنتم، لنقدم لكم تجربتنا الرائدة في مجال الحج والعمرة.&rdquo;
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
                  رؤيتنا
                </h3>
                <p className="text-white/90 leading-relaxed text-lg mb-6">
                  إن رحلة الحج والعمرة ليست مجرد سفر؛ بل هي تجربة تُشحن فيها القلوب، وتجدد فيها النوايا، وتسمو فيها الأرواح.
                </p>
                <p className="text-white/90 leading-relaxed text-lg">
                  ومن خلال مؤسسة النداء، تتجسد آمال الحجيج في خدمة متميزة تعبّر عن عمق الإيمان وتروي فرحة اللقاء مع بيت الله الحرام.
                </p>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-gold-start via-gold-end to-gold-start rounded-2xl shadow-xl p-8 lg:p-10">
                <p className="text-foreground text-xl lg:text-2xl font-bold text-center leading-relaxed">
                  لنكن اختياركم لنحظى بشرف خدمتكم
                  <span className="block mt-3 text-lg font-semibold">
                    ولتحظوا أنتم بعناية تليق بكم وباختياركم
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
              <p className="text-gray-600 font-semibold">عامًا من الخبرة</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold golden-text mb-2">1000+</div>
              <p className="text-gray-600 font-semibold">حاج ومعتمر سعيد</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl font-bold golden-text mb-2">100%</div>
              <p className="text-gray-600 font-semibold">رضا العملاء</p>
            </div>
          </motion.div>
        </div>
      </motion.section>


      <Footer />
    </>
  );
}
