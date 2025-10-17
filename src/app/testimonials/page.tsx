'use client';

import { motion } from 'framer-motion';
import { Award, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const testimonials = [
  // {
  // id: 1,
  // image: '/testimonials/darwish.jpeg',
  // title: 'شكر من معالي درويش بن اسماعيل البلوشي',
  // subtitle: 'الوزير المسؤول عن الشؤون المالية سابقاً',
  // description: 'شهادة تقدير وشكر من معالي الوزير على الخدمات المتميزة المقدمة',
  // },
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            شهادات وتقدير من شخصيات بارزة تؤكد على جودة خدماتنا وتميزنا في تنظيم رحلات الحج والعمرة
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="flex flex-col items-center gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (

            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              {/* Golden Top Border */}
              <div className="h-2 bg-gradient-to-r from-gold-start via-gold-end to-gold-start"></div>
              {/* Content */}
              <div className="p-6 lg:p-8">
                <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-start/10 to-gold-end/10 border border-gold-start/30 rounded-full mb-4">
                  <Award className="w-4 h-4 text-gold-start" />
                  <span className="text-sm font-semibold text-gold-start">شهادة تقدير</span>
                </div>

                <h2 className="text-2xl font-bold text-foreground mb-2 leading-tight">
                  {testimonial.title}
                </h2>

                <p className="text-gold-start font-semibold mb-3">
                  {testimonial.subtitle}
                </p>

                <p className="text-gray-600 leading-relaxed">
                  {testimonial.description}
                </p>
              </div>


              {/* Image */}
              <div className="relative w-full aspect-[3/4] bg-gray-50">
                <Image
                  src={testimonial.image}
                  alt={testimonial.title}
                  fill
                  className="object-contain p-4"
                  priority={index === 0}
                />
              </div>

            </motion.div>
          ))}
        </div>

        {/* Empty State Message */}
        {testimonials.length === 0 && (
          <div className="text-center py-20">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">لا توجد شهادات متاحة حالياً</p>
          </div>
        )}

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
