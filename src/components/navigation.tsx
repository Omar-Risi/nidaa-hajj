'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function NavLink({ href, children, className = '', onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`nav-link px-3 py-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { href: '/', label: 'الرئيسية', ariaLabel: 'Home' },
    { href: '/offers', label: 'العروض', ariaLabel: 'Offers' },
    { href: '/media', label: 'المعرض', ariaLabel: 'Media' },
    { href: '/news', label: 'الأخبار', ariaLabel: 'News' },
    { href: '/testimonials', label: 'شهادات نعتز بها', ariaLabel: 'Testimonials' },
    { href: '/contact', label: 'اتصل بنا', ariaLabel: 'Contact Us' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-foreground/50 backdrop-blur-sm z-30 absolute top-0 right-0 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse nav-link">
              <Image
                src="/Logo.svg"
                alt="Nidaa Hajj Logo"
                width={40}
                height={40}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
              />
              <div className="golden-text text-base sm:text-lg md:text-xl lg:text-2xl font-bold whitespace-nowrap">
                النداء للحج والعمرة
              </div>
            </Link>
          </div>

          {/* Navigation Links Section */}
          <div className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gold transition-colors duration-200 relative z-50 p-2 -mr-2"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-screen h-screen bg-foreground z-[100] lg:hidden"
          >
            <div className="flex flex-col h-full w-full">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
                <div className="golden-text text-xl sm:text-2xl font-bold">
                  القائمة
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="text-white hover:golden-text transition-colors duration-200 p-2 -mr-2"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Links - Centered */}
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 sm:space-y-6 px-6 sm:px-8">
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full max-w-md"
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="block py-4 sm:py-5 px-6 rounded-lg text-center text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200 golden-text text-xl sm:text-2xl font-semibold"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Footer section */}
              <div className="p-4 sm:p-6 border-t border-white/10">
                <p className="text-white/60 text-sm text-center">
                  النداء للحج والعمرة
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
