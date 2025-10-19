
'use client';
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
  Info
} from 'lucide-react';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import ImageCarousel from '@/components/image-carousel';

export default function HajjOfferPage() {

  const images = [
    "vermont-hotel-5.jpeg",
    "madden-hotel-1.jpeg",
    "madden-hotel-2.jpeg",
    "madden-hotel-3.jpeg",
    "madden-hotel-4.jpeg",
    "madden-hotel-5.jpeg",
    "madden-hotel-6.jpeg",
    "ruba-hotel-1.jpeg",
    "ruba-hotel-2.jpeg",
    "ruba-hotel-3.jpeg",
    "ruba-hotel-4.jpeg",
    "keddana-hotel-1.jpeg",
    "keddana-hotel-2.jpeg",
    "keddana-hotel-3.jpeg",
    "keddana-hotel-4.jpeg",
    "keddana-hotel-5.jpeg",
    "keddana-hotel-6.jpeg",
    "arafa-1.jpeg",
    "arafa-2.jpeg",
    "arafa-3.jpeg",
    "arafa-4.jpeg",
    "arafa-5.jpeg",
    "arafa-6.jpeg",
    "arafa-7.jpeg",

  ];

  const sections = [
    {
      icon: Plane,
      title: "مسقط - المدينة",
      content: "الرحلة الجوية على متن الطيران العماني: مسقط الى المدينة بتاريخ 2026/5/21 | جدة الى مسقط بتاريخ 2026/5/31"
    },
    {
      icon: Sparkles,
      title: "المدينة المنورة – ليلتان",
      items: [
        "استقبال الحجاج في مطار المدينة، ونقلهم إلى محل إقامتهم بحافلات حديثة",
        "الإقامة في فندق خمس نجوم قريب من الحرم النبوي",
        "بوفيهات فاخرة للثلاث وجبات طوال فترة الإقامة",
        "زيارة مسجد قباء والصلاة فيه، وزيارة جبل أحد، والمرور على الأماكن التاريخية",
        "شحن حقائب الحجاج إلى مكة في مساء اليوم الذي يسبق يوم المغادرة",
        "مغادرة المدينة إلى مكة بواسطة قطار الحرمين السريع"
      ]
    },
    {
      icon: Sparkles,
      title: "الانتقال إلى مكة المكرمة (7 - 13 من ذي الحجة)",
      items: [
        "الاستقبال في فندق ساعة مكة فيرمونت (برج الساعة) 5 نجوم، المطل على الحرم المكي الشريف",
        "قبل أداء العمرة: تناول العشاء بوفيه فاخر في مطعم الفندق المطل على الحرم المكي",
        "أداء العمرة، والتجمع بعدها في لونج فندق ساعة مكة فيرمونت",
        "في حافلات فاخرة يتم نقل الحجاج إلى الفندق المهيأ لإقامتهم في مكة، فندق تايم ربى مكة"
      ]
    },
    {
      icon: Building,
      title: "الإقامة في منى في أبراج كدانة الفندقية (من 8 إلى 12 من ذي الحجة)",
      subtitle: "راحة فندقية داخل المشاعر المقدسة",
      items: [
        "غرف مكيفة بأعلى مستوى من الراحة والنظافة",
        "دورات مياه راقية خاصة بأبراج كدانه لكل دور دورات مياه خاصة به",
        "مصلى في كل دور وجلسات استراحة خاصة",
        "ثلاث وجبات بوفيه عالمي فاخر ومشروبات وسناك على مدار اليوم",
        "إشراف ديني مستمر وتوجيه يومي لأعمال الحج",
        "خدمة طبية ومتابعة إدارية متكاملة"
      ]
    },
    {
      icon: Mountain,
      title: "عرفات – مزدلفة – أيام التشريق",
      items: [
        "التنقل بين المشاعر بالحافلات الحديثة المكيفة",
        "مخيم عرفة خاص للشعور بروحانية يوم عرفة مع تنظيم مميز",
        "المخيم مجهز بمكان لتناول الطعام، ومكان للصلاة، ودورات مياه راقية ونظيفة",
        "توفير التغذية للوجبات الرئيسية، والمشروبات الباردة والساخنة وسناك",
        "مزدلفة حط رحال"
      ]
    },
    {
      icon: Calendar,
      title: "أيام التشريق",
      items: [
        "المبيت في منى في أبراج منى ليلا، ويمكن للحجاج المكث في الفندق في مكة نهارا لمزيد من الراحة",
        "استخدام قطار المشاعر في يوم العيد وأيام التشريق لدخول منى ورمي الجمرات، إذا سمحت الأنظمة",
        "ليلة في جدة قبل العودة إلى الوطن حسب ظروف الطيران"
      ]
    },
    {
      icon: Info,
      title: "ملاحظات",
      items: [
        "السعر يشمل:",
        "تذكرة السفر الدولية على الدرجة السياحية، وللترقية إلى درجة رجال الأعمال يزيد 200 ر.ع",
        "الإقامة في المدينة وجدة في غرف ثنائية",
        "الإقامة في مكة في غرف ثلاثية، ولترقية الغرفة في مكة إلى ثنائية يدفع زيادة قدرها 450 ر.ع للشخص",
        "الإقامة في منى في غرف جماعية",
        "تذكرة القطار الدرجة السياحية، وللترقية إلى درجة رجال الأعمال (لم تُحدد الزيادة)"
      ]
    },

  ];

  const features = [
    "استضافة الحجاج في فندق ساعة مكة فيرمونت ، وبوفيه عشاء بإطلالة على الحرم المكي",
    "الرحلة الجوية على متن الطيران العماني",
    "ليلتان في فندق خمس نجوم قريب من الحرم النبوي بالمدينة",
    "الإقامة في فندق ساعة مكة فيرمونت (برج الساعة) المطل على الحرم",
    "الإقامة في أبراج كدانة الفندقية في منى (أول حملة عمانية)",
    "التنقل بقطار الحرمين السريع بين المدينة ومكة",
    "بوفيهات فاخرة للثلاث وجبات طوال فترة الإقامة",
    "غرف مكيفة بأعلى مستوى من الراحة والنظافة",
    "دورات مياه راقية خاصة لكل دور",
    "مصلى في كل دور وجلسات استراحة خاصة",
    "مخيم عرفة خاص مجهز بالكامل",
    "استخدام قطار المشاعر لرمي الجمرات",
    "إشراف ديني مستمر وتوجيه يومي",
    "خدمة طبية ومتابعة إدارية متكاملة",
    "زيارة مسجد قباء وجبل أحد والأماكن التاريخية",
    "شحن الحقائب بين المدينة ومكة",
  ];

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src="/kaaba-1.jpg"
          alt="حج 1447هـ"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-6 md:px-12 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            حج عام 1447هـ مع حملة النداء للحج والعمرة
          </h1>
          <p className="text-xl md:text-2xl text-white mb-3 max-w-3xl leading-relaxed">
            الحملة المعروفة بالتطوير المستمر في خدماتها، تسجل نفسها في هذا الموسم 1447هـ كأول حملة عمانية تقيم في منى في أبراج منى الفندقية الجديدة (كدانة).
          </p>
          <p className="text-xl md:text-2xl text-white font-bold mb-6">
            فأنتم على موعد مع إقامة فندقية في المشاعر المقدسة!!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/96897477488"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gold-start text-white rounded-lg hover:scale-105 transition-transform shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              احجز الآن عبر واتساب
            </a>
            <a
              href="tel:+96897477488"
              className="flex items-center gap-2 px-6 py-3 bg-white text-foreground rounded-lg hover:bg-gold-start transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5" />
              اتصل بنا
            </a>
          </div>
        </div>
      </div>

      {/* Opening Message */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="golden rounded-2xl p-8 md:p-12 text-foreground text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            لا نقول تعالوا لنحكي لكم .. بل تعالوا معنا، وكونوا جزءاً من التجربة
          </h2>
          <p className="text-xl text-foreground">
            تعالوا لنكتب القصة معاً، قصتنا التي تبدأ بروحانية طيبة الطيبة، وتنتهي بطمأنينة المناسك.
          </p>
        </div>

        <ImageCarousel
          images={images}
        />

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gold-start rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">المدة</h3>
            </div>
            <p className="text-gray-600 text-lg">11 يوم (21 مايو - 31 مايو 2026)</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gold-start rounded-full flex items-center justify-center">
                <Hotel className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">الإقامة</h3>
            </div>
            <p className="text-gray-600 text-lg">فنادق 5 نجوم + أبراج كدانة الفندقية في منى</p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">مميزات البرنامج</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-gold-start rounded-full flex items-center justify-center mt-1">
                  <Check className="w-4 h-4 text-foreground" />
                </div>
                <p className="text-gray-700 leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            تفاصيل البرنامج
          </h2>
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg  hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col items-start gap-4 mb-6">
                  <div className="w-14 h-14 golden rounded-xl flex items-center justify-center text-foreground shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{section.title}</h3>
                    {section.subtitle && (
                      <p className="text-gold-start font-medium">{section.subtitle}</p>
                    )}
                  </div>
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
                        <div className="flex-shrink-0 w-2 h-2 bg-gold-start rounded-full mt-2"></div>
                        <p className="text-gray-700 leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 golden rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            لا تفوت هذه الفرصة المميزة
          </h2>
          <p className="text-xl mb-8 text-foreground">
            كن جزءاً من تجربة الحج الفريدة مع حملة النداء
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/96897477488"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-white text-foreground rounded-lg hover:bg-gold-start transition-colors shadow-lg text-lg font-bold"
            >
              <MessageCircle className="w-6 h-6" />
              احجز الآن
            </a>
            <a
              href="tel:+96897477488"
              className="flex items-center gap-2 px-8 py-4 bg-foreground text-gold-start rounded-lg hover:scale-105  transition-transform shadow-lg text-lg font-bold"
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
