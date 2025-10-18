'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plane, 
  Building, 
  Calendar, 
  Hotel, 
  Check,
  Phone,
  MessageCircle,
  Mountain,
  Sparkles,
  Users
} from 'lucide-react';
import { Footer } from '@/components/footer';

interface HajjSection {
  title: string;
  icon: string;
  content?: string;
  items?: string[];
}

interface HajjOffer {
  id: string;
  title: string;
  description: string;
  duration: string;
  accommodation: string;
  features: string[];
  image: string;
  images: string[];
  sections: HajjSection[];
  createdAt: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  plane: Plane,
  building: Building,
  calendar: Calendar,
  hotel: Hotel,
  mountain: Mountain,
  mosque: Sparkles,
  kaaba: Sparkles,
};

export default function HajjOfferPage() {
  const router = useRouter();
  const [offer, setOffer] = useState<HajjOffer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffer();
  }, []);

  const fetchOffer = async () => {
    try {
      const response = await fetch('/api/hajj');
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setOffer(data[0]); // Get the first (latest) offer
        }
      }
    } catch (error) {
      console.error('Error fetching hajj offer:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Sparkles;
    return <Icon className="w-6 h-6" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white">
        <div className="text-center">
          <p className="text-2xl text-gray-600">لا توجد عروض حج متاحة حالياً</p>
          <button
            onClick={() => router.push('/')}
            className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white" dir="rtl">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${offer.image || '/kaaba-1.jpg'})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-6 md:px-12 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {offer.title}
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 mb-6 max-w-3xl leading-relaxed">
            {offer.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/96897477488"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              احجز الآن عبر واتساب
            </a>
            <a
              href="tel:+96897477488"
              className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5" />
              اتصل بنا
            </a>
          </div>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">المدة</h3>
            </div>
            <p className="text-gray-600 text-lg">{offer.duration}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Hotel className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">الإقامة</h3>
            </div>
            <p className="text-gray-600 text-lg">{offer.accommodation}</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">مميزات العرض</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offer.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-gray-700 leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">تفاصيل البرنامج</h2>
          {offer.sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md">
                  {getIcon(section.icon)}
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{section.title}</h3>
              </div>

              {section.content && (
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {section.content}
                </p>
              )}

              {section.items && section.items.length > 0 && (
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            لا تفوت هذه الفرصة المميزة
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            كن جزءاً من تجربة الحج الفريدة مع حملة النداء
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/96897477488"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 rounded-lg hover:bg-gray-100 transition-colors shadow-lg text-lg font-bold"
            >
              <MessageCircle className="w-6 h-6" />
              احجز الآن
            </a>
            <a
              href="tel:+96897477488"
              className="flex items-center gap-2 px-8 py-4 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition-colors shadow-lg text-lg font-bold"
            >
              <Phone className="w-6 h-6" />
              97477488
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
