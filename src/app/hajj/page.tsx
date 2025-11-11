'use client';
import {
  Plane,
  Building,
  Calendar,
  Hotel,
  Check,
  Phone,
  MessageCircle,
  Mountain,
  Sparkles,
  Info
} from 'lucide-react';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import ImageCarousel from '@/components/image-carousel';
import { useTranslation } from 'react-i18next';

export default function HajjOfferPage() {
  const { t, i18n } = useTranslation();

  const images = [
    "vermont-hotel-5.jpeg",
    "madden-hotel-1.jpeg",
    "madden-hotel-2.jpeg",
    "madden-hotel-3.jpeg",
    "madden-hotel-4.jpeg",
    "madden-hotel-5.jpeg",
    "madden-hotel-6.jpeg",
    "ruba-hotel-1.jpeg",
    "ruba-hotel-2.jpeg",
    "ruba-hotel-3.jpeg",
    "ruba-hotel-4.jpeg",
    "keddana-hotel-1.jpeg",
    "keddana-hotel-2.jpeg",
    "keddana-hotel-3.jpeg",
    "keddana-hotel-4.jpeg",
    "keddana-hotel-5.jpeg",
    "keddana-hotel-6.jpeg",
    "arafa-1.jpeg",
    "arafa-2.jpeg",
    "arafa-3.jpeg",
    "arafa-4.jpeg",
    "arafa-5.jpeg",
    "arafa-6.jpeg",
    "arafa-7.jpeg",
  ];
  // Get translated image titles
  const imageTitles = t('hajjPage.imageTitles', { returnObjects: true }) as string[];


  // Get translated features
  const features = t('hajjPage.features', { returnObjects: true }) as string[];

  // Get translated sections
  const sectionsContent = t('hajjPage.sectionsContent', { returnObjects: true }) as Record<string, { content?: string; items?: string[]; subtitle?: string }>;

  const sections = [
    {
      icon: Plane,
      title: t('hajjPage.sections.flight.title'),
      content: sectionsContent.flight.content
    },
    {
      icon: Sparkles,
      title: t('hajjPage.sections.medina.title'),
      items: sectionsContent.medina.items
    },
    {
      icon: Sparkles,
      title: t('hajjPage.sections.makkah.title'),
      items: sectionsContent.makkah.items
    },
    {
      icon: Building,
      title: t('hajjPage.sections.mina.title'),
      subtitle: t('hajjPage.sections.mina.subtitle'),
      items: sectionsContent.mina.items
    },
    {
      icon: Mountain,
      title: t('hajjPage.sections.arafat.title'),
      items: sectionsContent.arafat.items
    },
    {
      icon: Calendar,
      title: t('hajjPage.sections.tashreeq.title'),
      items: sectionsContent.tashreeq.items
    },
    {
      icon: Hotel,
      title: t('hajjPage.sections.jeddah.title'),
      content: sectionsContent.jeddah.content
    },
    {
      icon: Info,
      title: t('hajjPage.sections.notes.title'),
      items: sectionsContent.notes.items
    },
  ];

  return (
    <div className="min-h-screen" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <div className="relative min-h-[60vh] overflow-hidden">
        <Image
          src="/kaaba-1.jpg"
          alt="حج 1447هـ"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="relative z-10 h-full flex flex-col justify-end pt-48 px-6 md:px-12 max-w-7xl mx-auto pb-12">
          <h1 className={`text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
            {t('hajjPage.title')}
          </h1>
          <p className={`text-xl md:text-2xl text-white mb-3 max-w-3xl leading-relaxed ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
            {t('hajjPage.subtitle1')}
          </p>
          <p className={`text-xl md:text-2xl text-white font-bold mb-6 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
            {t('hajjPage.subtitle2')}
          </p>
          <div className={`flex flex-wrap gap-4 ${i18n.language === 'ar' ? 'justify-start' : 'justify-start'}`}>
            <a
              href="https://wa.me/96897477488"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gold-start text-white rounded-lg hover:scale-105 transition-transform shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              {t('hajjPage.bookWhatsapp')}
            </a>
            <a
              href="tel:+96897477488"
              className="flex items-center gap-2 px-6 py-3 bg-white text-foreground rounded-lg hover:bg-gold-start transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5" />
              {t('hajjPage.callUs')}
            </a>
          </div>
        </div>
      </div>

      {/* Opening Message */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="golden rounded-2xl p-8 md:p-12 text-foreground text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t('hajjPage.openingTitle')}
          </h2>
          <p className="text-xl text-foreground">
            {t('hajjPage.openingText')}
          </p>
        </div>

        <ImageCarousel
          images={images}
          titles={imageTitles}
        />

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gold-start rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{t('hajjPage.duration')}</h3>
            </div>
            <p className="text-gray-600 text-lg">{t('hajjPage.durationValue')}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gold-start rounded-full flex items-center justify-center">
                <Hotel className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{t('hajjPage.accommodation')}</h3>
            </div>
            <p className="text-gray-600 text-lg">{t('hajjPage.accommodationValue')}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gold-start">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gold-start rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{t('hajjPage.cost')}</h3>
            </div>
            <p className="text-3xl font-bold text-gold-start">{t('hajjPage.costValue')}</p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('hajjPage.programFeatures')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-gold-start rounded-full flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-foreground" />
                </div>
                <p className="text-gray-700 leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {t('hajjPage.storyTitle')}
          </h2>
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg  hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col items-start gap-4 mb-6">
                  <div className="w-14 h-14 golden rounded-xl flex items-center justify-center text-foreground shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{section.title}</h3>
                    {section.subtitle && (
                      <p className="text-gold-start font-medium">{section.subtitle}</p>
                    )}
                  </div>
                </div>

                {section.content && (
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    {section.content}
                  </p>
                )}

                {section.items && section.items.length > 0 && (
                  <ul className="space-y-3">
                    {section.items.map((item: string, itemIndex: number) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-gold-start rounded-full mt-2"></div>
                        <p className="text-gray-700 leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 golden rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {t('hajjPage.ctaTitle')}
          </h2>
          <p className="text-xl mb-2 text-foreground">
            {t('hajjPage.ctaSubtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a
              href="https://wa.me/96897477488"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-white text-foreground rounded-lg hover:bg-gold-start transition-colors shadow-lg text-lg font-bold"
            >
              <MessageCircle className="w-6 h-6" />
              {t('hajjPage.bookNow')}
            </a>
            <a
              href="tel:+96897477488"
              className="flex items-center gap-2 px-8 py-4 bg-foreground text-gold-start rounded-lg hover:scale-105 transition-transform shadow-lg text-lg font-bold"
            >
              <Phone className="w-6 h-6" />
              97477488
            </a>
          </div>
          <div className="pt-6 border-t border-foreground/20">
            <p className="text-foreground font-medium mb-2">{t('hajjPage.contactLabel')}</p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <a href="tel:+96897477488" className="text-foreground hover:underline font-bold">
                97477488
              </a>
              <span className="text-foreground">|</span>
              <a href="tel:+96899219093" className="text-foreground hover:underline font-bold">
                99219093
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
