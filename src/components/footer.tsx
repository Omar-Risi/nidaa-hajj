'use client';

import Link from "next/link"
import Image from 'next/image';
import { MessageCircle, Phone, Home, Package, Mail, Film } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/offers', label: 'العروض', icon: Package },
    { href: '/media', label: 'المعرض', icon: Film },
    { href: '/contact', label: 'اتصل بنا', icon: Mail },
  ];

  return (
    <footer className="bg-gradient-to-b from-foreground to-foreground/95 w-full border-t border-white/5">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Company Info Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Image
                  src="/Logo.svg"
                  alt="Nidaa Hajj Logo"
                  width={80}
                  height={80}
                  className="w-20 h-20 transition-transform group-hover:scale-110 duration-300"
                />
              </div>
              <div className="golden-text text-2xl font-bold">
                النداء للحج والعمرة
              </div>
            </Link>
            
            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              رحلة روحانية مباركة نحو بيت الله الحرام، نقدم لكم أفضل برامج الحج والعمرة بخدمة متميزة ورعاية شاملة.
            </p>
            {/*

            <div className="flex items-center gap-2 text-white/60">
              <svg className="w-4 h-4 text-gold-start" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">مسقط، سلطنة عُمان</span>
            </div>
            */}
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="golden-text text-xl font-bold mb-4">الروابط السريعة</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-white/80 hover:text-gold-start transition-colors duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-gold-start/20 group-hover:to-gold-end/20 transition-all duration-200">
                    <link.icon className="w-4 h-4" />
                  </div>
                  <span className="text-base">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="golden-text text-xl font-bold mb-4">تواصل معنا</h3>
            
            <div className="space-y-4">
              {/* Phone */}
              <a 
                href="tel:+96897477488" 
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-start/30 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gold-start/20 to-gold-end/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-gold-start" />
                </div>
                <div className="flex-1">
                  <p className="text-white/60 text-xs mb-1">اتصل بنا</p>
                  <p className="golden-text text-lg font-semibold">97477488</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a 
                href="https://wa.me/96897477488" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-start/30 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gold-start/20 to-gold-end/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-gold-start" />
                </div>
                <div className="flex-1">
                  <p className="text-white/60 text-xs mb-1">واتساب</p>
                  <p className="golden-text text-lg font-semibold">تحدث معنا</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm text-center sm:text-right">
              جميع الحقوق محفوظة © {currentYear} مؤسسة النداء للحج والعمرة
            </p>
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-xs">صُنع بـ</span>
              <span className="text-gold-start text-sm">♥</span>
              <span className="text-white/40 text-xs">في سلطنة عُمان</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
