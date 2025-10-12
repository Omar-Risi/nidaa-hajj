"use client"

export const GoldenIcon = ({ icon: Icon, size = 24, className = '', ...props }) => {
  const gradientId = `golden-gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#C8A250', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#EFDAAC', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#C8A250', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <g stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Icon size={size} style={{ stroke: `url(#${gradientId})` }} {...props} />
        </g>
      </svg>
    </div>
  );
};
