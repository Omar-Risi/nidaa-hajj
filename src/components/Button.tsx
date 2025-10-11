import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ButtonProps {
  text: string;
  icon?: LucideIcon;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({ text, icon: Icon, href, onClick, className = '' }: ButtonProps) {
  const buttonClasses = `
    inline-flex items-center gap-2 
    px-6 py-3 
    rounded-full 
    bg-foreground 
    text-white 
    font-medium
    transition-all duration-300
    hover:bg-gradient-to-r hover:from-gold-start hover:via-gold-end hover:to-gold-start
    hover:text-foreground
    ${className}
  `;

  const content = (
    <>
      {Icon && <Icon className="w-5 h-5" />}
      <span>{text}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {content}
    </button>
  );
}
