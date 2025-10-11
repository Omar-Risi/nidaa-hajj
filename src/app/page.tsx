'use client';

import Image from "next/image";
import Link from "next/link";
import OffersSection from "@/components/offers-section";

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
    </>
  );
}
