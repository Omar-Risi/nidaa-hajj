'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, LogOut, Sparkles, Loader2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';

interface PricingTier {
  icon: 'single' | 'double' | 'triple';
  price: number;
  label: string;
}

interface UmrahOffer {
  id: string;
  title: string;
  description: string;
  duration: string;
  accommodation: string;
  features: string[];
  image: string;
  images: string[];
  pricing: PricingTier[];
  createdAt: string;
}

export default function DashboardUmrahPage() {
  const router = useRouter();
  const [offers, setOffers] = useState<UmrahOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [mainImage, setMainImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [triplePrice, setTriplePrice] = useState('');
  const [doublePrice, setDoublePrice] = useState('');
  const [singlePrice, setSinglePrice] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/umrah');
      if (response.ok) {
        const data = await response.json();
        setOffers(data);
      }
    } catch (err) {
      console.error('Error fetching offers:', err);
    } finally {
      setLoading(false);
    }
  };

  const compressImage = async (file: File): Promise<string> => {
    const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1920, useWebWorker: true };
    const compressedFile = await imageCompression(file, options);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(compressedFile);
    });
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImages(true);
      try {
        const compressed = await compressImage(file);
        setMainImage(compressed);
        setMainImagePreview(compressed);
      } catch (err) {
        setError('فشل تحميل الصورة');
      } finally {
        setUploadingImages(false);
      }
    }
  };

  const handleGalleryImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadingImages(true);
      try {
        const compressed = await Promise.all(files.map(compressImage));
        setGalleryImages([...galleryImages, ...compressed]);
        setGalleryPreviews([...galleryPreviews, ...compressed]);
      } catch (err) {
        setError('فشل تحميل الصور');
      } finally {
        setUploadingImages(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const pricing: PricingTier[] = [
        { icon: 'triple', price: Number(triplePrice), label: 'ثلاثي' },
        { icon: 'double', price: Number(doublePrice), label: 'ثنائي' },
        { icon: 'single', price: Number(singlePrice), label: 'فردي' },
      ];

      const response = await fetch('/api/umrah', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, description, duration, accommodation,
          features: features.filter(f => f.trim()),
          image: mainImage, images: galleryImages, pricing,
        }),
      });

      if (response.ok) {
        setSuccess('تم إضافة العرض بنجاح');
        setTitle(''); setDescription(''); setDuration(''); setAccommodation('');
        setFeatures(['']); setMainImage(''); setGalleryImages([]);
        setMainImagePreview(''); setGalleryPreviews([]);
        setTriplePrice(''); setDoublePrice(''); setSinglePrice('');
        fetchOffers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'حدث خطأ');
      }
    } catch (err) {
      setError('حدث خطأ أثناء إضافة العرض');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العرض؟')) return;
    try {
      const response = await fetch(`/api/umrah?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setSuccess('تم حذف العرض بنجاح');
        fetchOffers();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('حدث خطأ أثناء حذف العرض');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8 pt-36">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>لوحة الأخبار</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>خروج</span>
            </button>
          </div>

          <div className="flex justify-center items-center mb-6">
            <div></div>
            <div className="inline-flex items-center justify-center gap-3 px-6 py-2.5 bg-gradient-to-r from-gold-start/10 via-gold-end/10 to-gold-start/10 border border-gold-start/30 rounded-full">
              <Sparkles className="w-5 h-5 text-gold-start" />
              <span className="golden-text text-lg font-semibold">لوحة التحكم</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            إدارة عروض العمرة
            <span className="block golden-text mt-2">والحج</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-gold-start to-gold-end rounded-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">إضافة عرض عمرة جديد</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  {success}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عنوان العرض</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المدة</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="مثال: 10 أيام / 9 ليالي"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الإقامة</label>
                  <input
                    type="text"
                    value={accommodation}
                    onChange={(e) => setAccommodation(e.target.value)}
                    placeholder="مثال: فنادق 5 نجوم"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المميزات</label>
                {features.map((f, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={f}
                      onChange={(e) => { const nf = [...features]; nf[i] = e.target.value; setFeatures(nf); }}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                      placeholder={`ميزة ${i + 1}`}
                    />
                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setFeatures(features.filter((_, idx) => idx !== i))}
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFeatures([...features, ''])}
                  className="mt-2 flex items-center gap-2 px-4 py-2 text-gold-start hover:bg-gold-start/10 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة ميزة</span>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الأسعار (ريال عماني)</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-sm font-medium text-gray-700">ثلاثي:</span>
                    <input
                      type="number"
                      value={triplePrice}
                      onChange={(e) => setTriplePrice(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-sm font-medium text-gray-700">ثنائي:</span>
                    <input
                      type="number"
                      value={doublePrice}
                      onChange={(e) => setDoublePrice(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-sm font-medium text-gray-700">فردي:</span>
                    <input
                      type="number"
                      value={singlePrice}
                      onChange={(e) => setSinglePrice(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الصورة الرئيسية</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageUpload}
                  disabled={uploadingImages}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                />
                {mainImagePreview && (
                  <div className="mt-3 relative inline-block">
                    <img src={mainImagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200" />
                    <button
                      type="button"
                      onClick={() => { setMainImage(''); setMainImagePreview(''); }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">صور المعرض (اختياري)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryImagesUpload}
                  disabled={uploadingImages}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                />
                {galleryPreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-4 gap-3">
                    {galleryPreviews.map((p, i) => (
                      <div key={i} className="relative group">
                        <img src={p} alt={`Gallery ${i + 1}`} className="w-full h-24 object-cover rounded-lg border-2 border-gray-200" />
                        <button
                          type="button"
                          onClick={() => {
                            setGalleryImages(galleryImages.filter((_, idx) => idx !== i));
                            setGalleryPreviews(galleryPreviews.filter((_, idx) => idx !== i));
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors shadow-md opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting || uploadingImages}
                className="w-full bg-gradient-to-r from-gold-start to-gold-end text-white py-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>جاري الإضافة...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    <span>إضافة العرض</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-gold-start to-gold-end rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">العروض الحالية</h2>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-gold-start" />
              </div>
            ) : (
              <div className="space-y-4">
                {offers.map((offer) => (
                  <div key={offer.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground mb-2">{offer.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {offer.duration} • {offer.accommodation}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{offer.description}</p>
                        <div className="flex flex-wrap gap-2 text-sm">
                          {offer.pricing.map((p: PricingTier, i: number) => (
                            <span key={i} className="px-3 py-1 bg-gold-start/10 text-gold-start rounded-full font-medium">
                              {p.label}: {p.price}ر.ع
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(offer.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                {offers.length === 0 && (
                  <div className="text-center py-12">
                    <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">لا توجد عروض حالياً</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
