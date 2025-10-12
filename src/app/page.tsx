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

      <motion.section
        initial={{ opacity: 0, translateY: '20px' }}
        whileInView={{ opacity: 1, translateY: '10px' }}
        transition={{ duration: 0.3, }}
        className="mt-[75] flex flex-col justify-center items-center"
      >
        <div className="px-4 py-1 flex items-center justify-center bg-foreground text-white rounded-full gap-2 transition-colors">
          <BadgeQuestionMark />
          <span> من نحن </span>
        </div>
        <h1 className="text-2xl mt-4 font-bold"> اجمع شوق قلبك لعناق الحرمين وتعال معنا </h1>

        <div className="bg-white w-3/4 lg:w-1/2 p-3 mt-8 rounded-md shadow-lg shadow-foreground/15 text-center font-semibold">
          <p className="mt-4">
            مؤسسة النداء للحج والعمرة ، إعادة لتعريف الفخامة والإبداع ، تصقلها التجربة ، وتنميها الخبرة ويطورها التفكير الدؤوب.
            تأسست النداء عام 2003 م ، وانطلقت تروي قضة الجمال في أعظم الرحلات الإيمانية ، لتقول للمشتاقين لبيت الله ،  نحن هنا لأنكم تستحقون الأفضل ، نبحر في ملكوت الجمال ، لنصل حيث أنتم ، لنقدم لكم تجربتنا الرائدة في مجال الحج والعمرة.
          </p>
          <p className="mt-4">

            إن رحلة الحج والعمرة ليست مجرد سفر؛ بل هي تجربة تُشحن فيها القلوب، وتجدد فيها النوايا، وتسمو فيها الأرواح. ومن خلال مؤسسة النداء، تتجسد آمال الحجيج في خدمة متميزة تعبّر عن عمق الإيمان وتروي فرحة اللقاء مع بيت الله الحرام.
          </p>

          <p className="mt-4 ">

            لنكن اختياركم لنحظى بشرف خدمتكم .. ولتحظوا أنتم بعناية تليق بكم وباختياركم
          </p>
        </div>

      </motion.section >


      <Footer />
    </>
  );
}
