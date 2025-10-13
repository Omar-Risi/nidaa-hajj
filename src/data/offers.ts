// types.ts - Export these types to use across your app
export interface PricingTier {
  icon: 'single' | 'double' | 'triple';
  price: number;
  label: string;
}

export interface OfferCard {
  id: number;
  title: string;
  content?: string;
  description?: string;
  features?: string[];
  duration?: string;
  accommodation?: string;
  image: string;
  images?: string[];
  pricing: PricingTier[];
  type: 'umrah' | 'hajj';
}

// offers.ts - Your data file
export const umrahOffers: OfferCard[] = [
  {
    id: 1,
    type: 'umrah',
    title: "عمرة رمضان مع حملة النداء 1447هـ",
    content: "قال عليه الصلاة والسلام: 'عمرة في رمضان تعدل حجة معي'",
    description: "قال عليه الصلاة والسلام: 'عمرة في رمضان تعدل حجة معي' - اجمع شوق قلبك لعناق الحرمين وتعال معنا..",
    duration: "للفترة 7-13 من رمضان 1447هـ (25/2 - 3/3/2026م) | 3 ليال مدينة، و3 ليال مكة",
    accommodation: "مكة: فندق ساعة مكة فيرمونت | المدينة: فندق مادن",
    features: [
      "السفر على الطيران العماني",
      "فندق ساعة مكة فيرمونت في مكة، مع بوفيه فطور",
      "فندق مادن في المدينة، مع بوفيه فطور",
      "التنقل من المدينة إلى مكة بالقطار",
      "حافلات حديثة للاستقبال والتوديع في المطارات ومحطات القطار",
      "شاحنة لنقل الأمتعة من المدينة إلى مكة، لتجد أمتعتك في انتظارك حين تصل مكة",
      "خدمات راقية ومتعددة تليق بمعتمرينا",
    ],
    image: "/hero-bg.jpg",
    images: ["/hero-bg.jpg", "/hero-bg.jpg", "/hero-bg.jpg", "/hero-bg.jpg"],
    pricing: [
      { icon: 'single', price: 1310, label: 'غرفة فردية' },
      { icon: 'double', price: 785, label: 'غرفة ثنائية (للشخص)' },
      { icon: 'triple', price: 680, label: 'غرفة ثلاثية (للشخص)' },
    ]
  },
  {
    id: 2,
    type: 'umrah',
    title: "عمرة منتصف العام الدراسي مع حملة النداء",
    content: "22 عاماً من الخبرة والتطوير، نترجمها واقعاً يجمع لكم بين الراحة والروحانية",
    description: "22 عاماً من الخبرة والتطوير، نترجمها واقعاً يجمع لكم بين الراحة والروحانية.. نحن نعتني بأدق التفاصيل لأنكم تستحقون الأفضل",
    duration: "الفترة 7-13/1/2026م | 3 ليال المدينة، و3 ليال مكة",
    accommodation: "في أفخم فنادق الخمس نجوم - مكة: فيرمونت | المدينة: مادن",
    features: [
      "السفر على الطيران العماني",
      "فندق ساعة مكة فيرمونت في مكة، مع بوفيه فطور",
      "فندق مادن في المدينة، مع بوفيه فطور",
      "جولة في المدينة لبعض الأماكن التاريخية",
      "التنقل من المدينة إلى مكة بالقطار",
      "حافلات حديثة مريحة لتنقلات المسافات الداخلية القصيرة",
      "شاحنة لنقل الأمتعة من المدينة إلى مكة",
      "خدمات راقية ومتعددة تليق بمعتمرينا",
    ],
    image: "/hero-bg.jpg",
    images: ["/hero-bg.jpg", "/hero-bg.jpg", "/hero-bg.jpg"],
    pricing: [
      { icon: 'single', price: 860, label: 'غرفة فردية' },
      { icon: 'double', price: 555, label: 'غرفة ثنائية (للشخص)' },
      { icon: 'triple', price: 500, label: 'غرفة ثلاثية (للشخص)' },
    ]
  },
];

export const hajjOffers: OfferCard[] = [
  // Add hajj offers here when available
];

// Helper function to get all offers
export const getAllOffers = (): OfferCard[] => {
  return [...umrahOffers, ...hajjOffers];
};

// Helper function to get offer by ID
export const getOfferById = (id: number): OfferCard | undefined => {
  return getAllOffers().find(offer => offer.id === id);
};

// Helper function to get offers by type
export const getOffersByType = (type: 'umrah' | 'hajj'): OfferCard[] => {
  return getAllOffers().filter(offer => offer.type === type);
};