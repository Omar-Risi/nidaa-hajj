'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Loader2, Newspaper } from 'lucide-react';
import Link from 'next/link';
import ImageCarousel from '@/components/image-carousel';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export default function NewsDetailPage() {
  const params = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!params.id) return;

    fetch('/api/news')
      .then((res) => res.json())
      .then((data: NewsItem[]) => {
        const newsItem = data.find((item) => item.id === params.id);
        if (newsItem) {
          console.log('News item found:', newsItem);
          console.log('Images array:', newsItem.images);
          console.log('Images length:', newsItem.images?.length);
          setNews(newsItem);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setError(true);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-gold-start" />
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="max-w-4xl mx-auto text-center">
          <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            الخبر غير موجود
          </h1>
          <p className="text-gray-500 mb-8">
            عذراً، لم نتمكن من العثور على الخبر المطلوب
          </p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl"
          >
            <ArrowLeft className="w-5 h-5" />
            العودة لجميع الأخبار
          </Link>
        </div>
      </div>
    );
  }

  const hasImages = news.images && Array.isArray(news.images) && news.images.length > 0;

  return (
    <div className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8 mt-36">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-gold-start hover:text-gold-end transition-colors duration-300 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            العودة لجميع الأخبار
          </Link>
        </motion.div>

        {/* News Article Card */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Golden Top Border */}
          <div className="h-2 bg-gradient-to-r from-gold-start via-gold-end to-gold-start"></div>

          {/* Image Carousel */}
          {hasImages && (
            <div className="p-4 sm:p-6">
              <ImageCarousel images={news.images!} />
            </div>
          )}

          <div className="p-6 sm:p-8 lg:p-12">
            {/* Header Badge */}
            <div className="inline-flex items-center justify-center gap-3 px-6 py-2.5 bg-gradient-to-r from-gold-start/10 via-gold-end/10 to-gold-start/10 border border-gold-start/30 rounded-full mb-6">
              <Newspaper className="w-5 h-5 text-gold-start" />
              <span className="golden-text text-sm font-semibold">خبر</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-gold-start" />
              <time className="text-gray-600 font-medium">
                {new Date(news.date).toLocaleDateString('ar-SA', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
              {news.title}
            </h1>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {news.content}
              </p>
            </div>

            {/* Footer Meta */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
                <div>
                  تم النشر: {new Date(news.createdAt).toLocaleDateString('ar-SA')}
                </div>
                {news.updatedAt !== news.createdAt && (
                  <div>
                    آخر تحديث: {new Date(news.updatedAt).toLocaleDateString('ar-SA')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.article>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 bg-white border-2 border-gold-start text-gold-start px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gold-start hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            جميع الأخبار
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-start via-gold-end to-gold-start text-foreground px-6 py-3 rounded-lg text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            الصفحة الرئيسية
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
