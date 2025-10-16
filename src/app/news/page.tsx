'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-gold-start" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center gap-3 px-6 py-2.5 bg-gradient-to-r from-gold-start/10 via-gold-end/10 to-gold-start/10 border border-gold-start/30 rounded-full mb-6"
          >
            <Newspaper className="w-5 h-5 text-gold-start" />
            <span className="golden-text text-lg font-semibold">جميع الأخبار</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight"
          >
            آخر أخبارنا
            <span className="block golden-text mt-2 py-2">وتحديثاتنا</span>
          </motion.h1>
        </div>

        {/* News Grid */}
        {news.length === 0 ? (
          <div className="text-center py-20">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">لا توجد أخبار متاحة حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {news.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col"
              >
                {/* Golden Top Border */}
                <div className="h-1 bg-gradient-to-r from-gold-start via-gold-end to-gold-start"></div>

                <div className="p-6 lg:p-8 flex flex-col flex-1">
                  {/* Date Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-gold-start" />
                    <time className="text-sm text-gray-500 font-medium">
                      {new Date(item.date).toLocaleDateString('ar-SA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4 leading-tight group-hover:text-gold-start transition-colors duration-300">
                    {item.title}
                  </h2>

                  {/* Content Preview */}
                  <p className="text-gray-600 leading-relaxed text-base flex-1 line-clamp-3">
                    {item.content}
                  </p>

                  {/* Read More Link */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link
                      href={`/news/${item.id}`}
                      className="text-gold-start font-semibold hover:text-gold-end transition-colors duration-300 flex items-center gap-2 group/btn"
                    >
                      <span>اقرأ المزيد</span>
                      <ArrowLeft className="w-5 h-5 transform group-hover/btn:-translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
