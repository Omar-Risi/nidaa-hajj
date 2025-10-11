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
    { href: '/omrah', label: 'برنامج العمرة', ariaLabel: 'Omrah Programme' },
    { href: '/hajj', label: 'برنامج الحج', ariaLabel: 'Hajj Programme' },
    { href: '/contact', label: 'اتصل بنا', ariaLabel: 'Contact Us' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-foreground/50 backdrop-blur-sm z-30 absolute top-0 left-0 w-full">
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse nav-link">
              <Image
                src="/Logo.svg"
                alt="Nidaa Hajj Logo"
                width={40}
                height={40}
                className="w-24 h-24"
              />
              <div className="golden-text text-2xl font-bold">
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
              className="text-white hover:text-gold transition-colors duration-200 relative z-50"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
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
            className="fixed inset-0 w-screen h-screen bg-foreground z-[60] lg:hidden"
          >
            <div className="flex flex-col h-full w-full">
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={closeMobileMenu}
                  className="text-white hover:golden-text transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-8 h-8"
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
              <div className="flex-1 flex flex-col items-center justify-center space-y-6 px-8">
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
                      className="block py-4 px-6 rounded-lg text-center text-white hover:bg-white/10 transition-all duration-200 golden-text text-2xl font-semibold"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
