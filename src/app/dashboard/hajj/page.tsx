'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import imageCompression from 'browser-image-compression';
import { Plus, Trash2, X } from 'lucide-react';

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

export default function DashboardHajjPage() {
  const router = useRouter();
  const [offers, setOffers] = useState<HajjOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [mainImage, setMainImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [sections, setSections] = useState<HajjSection[]>([
    { title: '', icon: 'sparkles', items: [''] },
  ]);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch('/api/hajj');
      if (response.ok) {
        const data = await response.json();
        setOffers(data);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const compressImage = async (file: File): Promise<string> => {
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      
      const compressedFile = await imageCompression(file, options);
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(compressedFile);
      });
    } catch (error) {
      console.error('Error compressing image:', error);
      throw error;
    }
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedImage = await compressImage(file);
        setMainImage(compressedImage);
        setMainImagePreview(compressedImage);
      } catch (error) {
        console.error('Error uploading main image:', error);
      }
    }
  };

  const handleGalleryImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      try {
        const compressedImages = await Promise.all(
          files.map(file => compressImage(file))
        );
        setGalleryImages([...galleryImages, ...compressedImages]);
        setGalleryPreviews([...galleryPreviews, ...compressedImages]);
      } catch (error) {
        console.error('Error uploading gallery images:', error);
      }
    }
  };

  const addFeature = () => setFeatures([...features, '']);
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));

  const addSection = () => {
    setSections([...sections, { title: '', icon: 'sparkles', items: [''] }]);
  };

  const updateSection = (index: number, field: keyof HajjSection, value: string | string[] | undefined) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const addSectionItem = (sectionIndex: number) => {
    const newSections = [...sections];
    if (!newSections[sectionIndex].items) {
      newSections[sectionIndex].items = [];
    }
    newSections[sectionIndex].items!.push('');
    setSections(newSections);
  };

  const updateSectionItem = (sectionIndex: number, itemIndex: number, value: string) => {
    const newSections = [...sections];
    if (newSections[sectionIndex].items) {
      newSections[sectionIndex].items![itemIndex] = value;
      setSections(newSections);
    }
  };

  const removeSectionItem = (sectionIndex: number, itemIndex: number) => {
    const newSections = [...sections];
    if (newSections[sectionIndex].items) {
      newSections[sectionIndex].items = newSections[sectionIndex].items!.filter((_, i) => i !== itemIndex);
      setSections(newSections);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const filteredFeatures = features.filter(f => f.trim() !== '');
      const filteredSections = sections.map(s => ({
        ...s,
        items: s.items?.filter(item => item.trim() !== '') || [],
      }));

      const response = await fetch('/api/hajj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          duration,
          accommodation,
          features: filteredFeatures,
          image: mainImage,
          images: galleryImages,
          sections: filteredSections,
        }),
      });

      if (response.ok) {
        setMessage('تم إضافة العرض بنجاح');
        // Reset form
        setTitle('');
        setDescription('');
        setDuration('');
        setAccommodation('');
        setFeatures(['']);
        setMainImage('');
        setGalleryImages([]);
        setMainImagePreview('');
        setGalleryPreviews([]);
        setSections([{ title: '', icon: 'sparkles', items: [''] }]);
        fetchOffers();
      } else {
        const data = await response.json();
        setMessage(data.error || 'حدث خطأ');
      }
    } catch (error) {
      console.error('Error creating offer:', error);
      setMessage('حدث خطأ أثناء إضافة العرض');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العرض؟')) return;

    try {
      const response = await fetch(`/api/hajj?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setMessage('تم حذف العرض بنجاح');
        fetchOffers();
      } else {
        const data = await response.json();
        setMessage(data.error || 'حدث خطأ');
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
      setMessage('حدث خطأ أثناء حذف العرض');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">إدارة عروض الحج</h1>
          <div className="flex gap-4">
            <button onClick={() => router.push('/dashboard')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              لوحة الأخبار
            </button>
            <button onClick={() => router.push('/dashboard/umrah')} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              لوحة العمرة
            </button>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              تسجيل الخروج
            </button>
          </div>
        </div>

        {message && <div className="mb-4 p-4 rounded-lg bg-blue-100 text-blue-800">{message}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">إضافة عرض حج جديد</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">عنوان العرض</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded-lg" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الوصف</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border rounded-lg min-h-[100px]" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">المدة</label>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="مثال: 10 أيام" className="w-full p-3 border rounded-lg" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الإقامة</label>
                <input type="text" value={accommodation} onChange={(e) => setAccommodation(e.target.value)} className="w-full p-3 border rounded-lg" required />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">المميزات</label>
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input type="text" value={feature} onChange={(e) => updateFeature(index, e.target.value)} className="flex-1 p-3 border rounded-lg" placeholder={`ميزة ${index + 1}`} />
                    {features.length > 1 && (
                      <button type="button" onClick={() => removeFeature(index)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">حذف</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addFeature} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">إضافة ميزة</button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الصورة الرئيسية</label>
                <input type="file" accept="image/*" onChange={handleMainImageUpload} className="w-full p-3 border rounded-lg" />
                {mainImagePreview && (
                  <div className="mt-2 relative inline-block">
                    <img src={mainImagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                    <button type="button" onClick={() => { setMainImage(''); setMainImagePreview(''); }} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">×</button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الأقسام التفصيلية</label>
                {sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold">قسم {sectionIndex + 1}</h4>
                      {sections.length > 1 && (
                        <button type="button" onClick={() => removeSection(sectionIndex)} className="text-red-500 hover:text-red-700"><X className="w-5 h-5" /></button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input type="text" value={section.title} onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)} placeholder="عنوان القسم" className="w-full p-2 border rounded-lg" />
                      <select value={section.icon} onChange={(e) => updateSection(sectionIndex, 'icon', e.target.value)} className="w-full p-2 border rounded-lg">
                        <option value="plane">طائرة</option>
                        <option value="building">مبنى</option>
                        <option value="calendar">تقويم</option>
                        <option value="hotel">فندق</option>
                        <option value="mountain">جبل</option>
                        <option value="mosque">مسجد</option>
                        <option value="kaaba">كعبة</option>
                        <option value="sparkles">نجوم</option>
                      </select>
                      <div>
                        <label className="text-xs text-gray-600">عناصر القسم</label>
                        {section.items?.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex gap-2 mt-2">
                            <input type="text" value={item} onChange={(e) => updateSectionItem(sectionIndex, itemIndex, e.target.value)} placeholder={`عنصر ${itemIndex + 1}`} className="flex-1 p-2 border rounded-lg text-sm" />
                            {(section.items?.length || 0) > 1 && (
                              <button type="button" onClick={() => removeSectionItem(sectionIndex, itemIndex)} className="px-2 py-1 bg-red-400 text-white rounded text-sm">حذف</button>
                            )}
                          </div>
                        ))}
                        <button type="button" onClick={() => addSectionItem(sectionIndex)} className="mt-2 px-3 py-1 bg-blue-400 text-white rounded text-sm">إضافة عنصر</button>
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addSection} className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> إضافة قسم جديد
                </button>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400">
                {loading ? 'جاري الإضافة...' : 'إضافة العرض'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">العروض الحالية</h2>
            <div className="space-y-4">
              {offers.map((offer) => (
                <div key={offer.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{offer.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{offer.duration} - {offer.accommodation}</p>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{offer.description}</p>
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">المميزات:</span> {offer.features.length} ميزة
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">الأقسام:</span> {offer.sections.length} قسم
                      </div>
                    </div>
                    <button onClick={() => handleDelete(offer.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">حذف</button>
                  </div>
                </div>
              ))}
              {offers.length === 0 && <p className="text-gray-500 text-center py-8">لا توجد عروض حالياً</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
