'use client';

import { motion } from 'framer-motion';
import { Award, ArrowLeft, Star, Medal, Users, MessageSquareText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Certificate sections data
const certificateSections = [
  {
    id: 'mmtaz',
    title: 'تقييم ممتاز من دائرة شؤون الحج',
    subtitle: 'شهادة امتياز رسمية',
    description: 'تقدير رسمي بتقييم ممتاز من دائرة شؤون الحج، تأكيداً على التزام الحملة بأعلى معايير الخدمة والجودة',
    icon: Award,
    images: ['/mmtaz/Untitled.jpg'],
    gradient: 'from-green-500/10 to-green-600/10',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-500',
  },
  {
    id: '5star',
    title: 'تقييم خمس نجوم وممتاز من الحجاج لحملة النداء للحج',
    subtitle: 'موسم الحج 1446 هـ',
    description: 'حصول حملة النداء على تقييم خمس نجوم وتقدير ممتاز من الحجاج، مما يعكس رضاهم التام عن الخدمات المقدمة',
    icon: Star,
    images: ['/5star/Untitled.jpg'],
    gradient: 'from-gold-start/10 to-gold-end/10',
    borderColor: 'border-gold-start/30',
    iconColor: 'text-gold-start',
  },
  {
    id: 'taqieem',
    title: 'تقييم حملة النداء للحج من قبل البعثة العمانية للحج',
    subtitle: 'موسم الحج 1447 هـ',
    description: 'تقييم رسمي متميز من البعثة العمانية للحج يعكس مستوى الخدمات المقدمة والالتزام بأعلى معايير الجودة',
    icon: Medal,
    images: ['/taqieem/Untitled.jpg'],
    gradient: 'from-purple-500/10 to-purple-600/10',
    borderColor: 'border-purple-500/30',
    iconColor: 'text-purple-500',
  },
  {
    id: 'araa',
    title: 'آراء بعض الحجاج في الحملة',
    subtitle: 'من الموقع الرسمي لوزارة الأوقاف',
    description: 'شهادات وآراء حقيقية من حجاج بيت الله الحرام عن تجربتهم مع حملة النداء، مأخوذة من الموقع الرسمي لوزارة الأوقاف',
    icon: MessageSquareText,
    images: Array.from({ length: 19 }, (_, i) => `/araa/Untitled${i === 0 ? '' : i + 1}.jpg`),
    gradient: 'from-blue-500/10 to-blue-600/10',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-500',
  },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-3 px-6 py-2.5 bg-gradient-to-r from-gold-start/10 via-gold-end/10 to-gold-start/10 border border-gold-start/30 rounded-full mb-6"
          >
            <Award className="w-5 h-5 text-gold-start" />
            <span className="golden-text text-lg font-semibold">الشهادات</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight"
          >
            شهادات
            <span className="block golden-text mt-2 py-2">نعتز بها</span>
          </motion.h1>

         
        </div>

        {/* Certificate Sections */}
        <div className="space-y-16 lg:space-y-24">
          {certificateSections.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="scroll-mt-20"
                id={section.id}
              >
                {/* Section Header */}
                <div className="text-center mb-8 lg:mb-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r ${section.gradient} border ${section.borderColor} rounded-full mb-4`}
                  >
                    <Icon className={`w-5 h-5 ${section.iconColor}`} />
                    <span className={`text-sm font-semibold ${section.iconColor}`}>
                      {section.subtitle}
                    </span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight"
                  >
                    {section.title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
                  >
                    {section.description}
                  </motion.p>
                </div>

                {/* Images Grid */}
                <div className={`grid gap-6 ${
                  section.images.length === 1 
                    ? 'grid-cols-1 max-w-3xl mx-auto' 
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {section.images.map((image, imageIndex) => (
                    <motion.div
                      key={`${section.id}-${imageIndex}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: sectionIndex * 0.1 + imageIndex * 0.05 
                      }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
                    >
                      {/* Golden Top Border */}
                      <div className={`h-1.5 bg-gradient-to-r ${section.gradient.replace('/10', '/50')}`}></div>
                      
                      {/* Image Container */}
                      <div className="relative w-full aspect-[3/4] bg-gray-50">
                        <Image
                          src={image}
                          alt={`${section.title} - صورة ${imageIndex + 1}`}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>

                      {/* Image Counter for multiple images */}
                      {section.images.length > 1 && (
                        <div className="p-3 text-center bg-gray-50">
                          <span className="text-sm text-gray-500 font-medium">
                            {imageIndex + 1} من {section.images.length}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Divider between sections (except last) */}
                {sectionIndex < certificateSections.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 lg:mt-24 max-w-xl mx-auto"
                  >
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  </motion.div>
                )}
              </motion.section>
            );
          })}
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 lg:mt-32 bg-gradient-to-br from-foreground to-foreground/95 rounded-2xl p-8 lg:p-12"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-center golden-text mb-8">
            إنجازاتنا بالأرقام
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold golden-text mb-2">20+</div>
              <p className="text-white/80 text-lg">عامًا من التميز</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold golden-text mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-white/80 text-lg">تقييم خمس نجوم</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold golden-text mb-2">100%</div>
              <p className="text-white/80 text-lg">رضا العملاء</p>
            </div>
          </div>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl"
          >
            <ArrowLeft className="w-5 h-5" />
            العودة للرئيسية
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
