import Image from 'next/image';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function NavLink({ href, children, className = '' }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`text-xl font-semibold nav-link px-3 py-2 ${className}`}
    >
      {children}
    </Link>
  );
}

export function Navigation() {
  const navigationLinks = [
    { href: '/', label: 'الرئيسية', ariaLabel: 'Home' },
    { href: '/offers', label: 'العروض', ariaLabel: 'Offers' },
    { href: '/omrah', label: 'برنامج العمرة', ariaLabel: 'Omrah Programme' },
    { href: '/hajj', label: 'برنامج الحج', ariaLabel: 'Hajj Programme' },
    { href: '/contact', label: 'اتصل بنا', ariaLabel: 'Contact Us' },
  ];

  return (
    <nav className="bg-foreground/50 backdrop-blur-sm absolute top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse nav-link">
              <Image
                src="/Logo.svg"
                alt="Nidaa Hajj Logo"
                width={80}
                height={80}
                className="w-24 h-24"
              />
              <div className="text-white text-xl font-bold">
                النداء للحج والعمرة
              </div>
            </Link>
          </div>

          {/* Navigation Links Section */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
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
          <div className="md:hidden">
            <button
              className="text-white hover:text-gold transition-colors duration-200"
              aria-label="Toggle navigation menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Hidden by default, can be shown with state management */}
        <div className="md:hidden hidden">
          <div className="pb-4 space-y-2">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                className="block text-base"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
