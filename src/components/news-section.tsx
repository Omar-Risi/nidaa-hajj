'use client';

import { motion } from "framer-motion";
import { Newspaper, Calendar } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "افتتاح برنامج العمرة الشتوي المميز",
    date: "2025-10-10",
    content: "يسرنا أن نعلن عن إطلاق برنامجنا الشتوي المميز للعمرة، والذي يتضمن إقامة فاخرة في أفضل الفنادق القريبة من الحرمين الشريفين مع خدمات متكاملة وعناية شخصية لكل معتمر."
  },
  {
    id: 2,
    title: "تسجيل مبكر لموسم حج 1446هـ",
    date: "2025-10-05",
    content: "بدأت مؤسسة النداء باستقبال حجوزات موسم الحج للعام القادم. احجز مبكرًا للحصول على أفضل العروض والخدمات المتميزة التي تليق برحلتك الإيمانية."
  },
  {
    id: 3,
    title: "شهادات عملائنا تتحدث عن تجربتهم",
    date: "2025-09-28",
    content: "حصلنا على تقييمات استثنائية من حجاجنا ومعتمرينا لهذا الموسم. شكرًا لثقتكم التي تدفعنا دائمًا لتقديم الأفضل وتحقيق رضاكم الكامل."
  }
];

export default function NewsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
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
            <Newspaper className="w-5 h-5 text-gold-start" />
            <span className="golden-text text-lg font-semibold">آخر الأخبار</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight"
          >
            تابع جديدنا
            <span className="block golden-text mt-2 py-2">وكن على اطلاع دائم</span>
          </motion.h2>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {newsData.map((news, index) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col"
            >
              {/* Golden Top Border */}
              <div className="h-1 bg-gradient-to-r from-gold-start via-gold-end to-gold-start"></div>

              <div className="p-6 lg:p-8 flex flex-col flex-1">
                {/* Date Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-gold-start" />
                  <time className="text-sm text-gray-500 font-medium">
                    {new Date(news.date).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4 leading-tight group-hover:text-gold-start transition-colors duration-300">
                  {news.title}
                </h3>

                {/* Content */}
                <p className="text-gray-600 leading-relaxed text-base flex-1">
                  {news.content}
                </p>

                {/* Read More Link */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button className="text-gold-start font-semibold hover:text-gold-end transition-colors duration-300 flex items-center gap-2 group/btn">
                    <span>اقرأ المزيد</span>
                    <svg
                      className="w-5 h-5 transform group-hover/btn:-translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl">
            عرض جميع الأخبار
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
