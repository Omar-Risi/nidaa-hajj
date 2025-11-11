'use client';

import { motion } from "framer-motion";
import { Phone, MessageCircle, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/footer";
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-gold-start/20 to-gold-end/20 border border-gold-start/50 rounded-full mb-6 backdrop-blur-sm">
              <MessageCircle className="w-5 h-5 text-gold-start" />
              <span className="golden-text text-lg font-semibold">{t('contactPage.badge')}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('contactPage.title')}
              <span className="block golden-text mt-3">{t('contactPage.subtitle')}</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {t('contactPage.description')}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="tel:+96897477488"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-gold-start to-gold-end text-foreground font-bold rounded-xl hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {t('contactPage.callNow')}
              </motion.a>
              <motion.a
                href="https://wa.me/96897477488"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 border border-white/20"
              >
                <MessageCircle className="w-5 h-5" />
                {t('footer.whatsapp')}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Main Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Why Contact Us */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100">
              <h3 className="text-2xl font-bold text-foreground mb-6">{t('contactPage.whyContact')}</h3>
              
              <div className="space-y-4">
                {[
                  t('contactPage.reasons.consultation'),
                  t('contactPage.reasons.pricing'),
                  t('contactPage.reasons.booking'),
                  t('contactPage.reasons.questions'),
                  t('contactPage.reasons.offers')
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gold-start/20 to-gold-end/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-gold-start" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            </motion.div>

            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-gold-start via-gold-end to-gold-start rounded-2xl shadow-xl p-8 lg:p-10">
                <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
                  {t('contactPage.needHelp')}
                </h3>
                <p className="text-foreground/80 text-center mb-6">
                  {t('contactPage.contactNow')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+96897477488"
                    className="flex-1 py-3 bg-foreground text-white font-semibold rounded-xl hover:bg-foreground/90 transition-colors text-center"
                  >
                    {t('contactPage.callButton')}
                  </a>
                  <a
                    href="https://wa.me/96897477488"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-white text-foreground font-semibold rounded-xl hover:shadow-lg transition-all text-center"
                  >
                    {t('footer.whatsapp')}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
