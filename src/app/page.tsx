import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { Calendar, Phone, MapPin } from "lucide-react";

export default function Home() {
  return (
    <>
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

            {/* Button */}
            <Link
              href="#offers"
              className="relative bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground px-8 py-4 rounded-lg text-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl"
            >
              إبدأ بالحجز
            </Link>
          </div>
        </div>
      </section>

      {/* Button Section - Aligned with navbar */}
      <section className="mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center w-full flex-wrap gap-8">
            <Button
              text="احجز الآن"
              icon={Calendar}
              href="#offers"
            />
            <Button
              text="اتصل بنا"
              icon={Phone}
              href="#contact"
            />
            <Button
              text="مواقعنا"
              icon={MapPin}
              href="#locations"
            />
          </div>
        </div>
      </section>
    </>
  );
}
