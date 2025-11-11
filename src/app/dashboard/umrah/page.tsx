'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, LogOut, Sparkles, Loader2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const router = useRouter();
  const [offers, setOffers] = useState<UmrahOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [duration, setDuration] = useState('');
  const [durationEn, setDurationEn] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [accommodationEn, setAccommodationEn] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [featuresEn, setFeaturesEn] = useState<string[]>(['']);
  const [mainImage, setMainImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [triplePrice, setTriplePrice] = useState('');
  const [doublePrice, setDoublePrice] = useState('');
  const [singlePrice, setSinglePrice] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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
        setError(t('dashboard.uploadFailed'));
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
        setError(t('dashboard.uploadFailed'));
      } finally {
        setUploadingImages(false);
      }
    }
  };

  const handleEdit = (offer: UmrahOffer) => {
    setEditingId(offer.id);
    setTitle(offer.title);
    setTitleEn((offer as any).titleEn || '');
    setDescription(offer.description);
    setDescriptionEn((offer as any).descriptionEn || '');
    setDuration(offer.duration);
    setDurationEn((offer as any).durationEn || '');
    setAccommodation(offer.accommodation);
    setAccommodationEn((offer as any).accommodationEn || '');
    setFeatures(offer.features.length > 0 ? offer.features : ['']);
    setFeaturesEn((offer as any).featuresEn?.length > 0 ? (offer as any).featuresEn : ['']);
    setMainImage(offer.image);
    setMainImagePreview(offer.image);
    setGalleryImages(offer.images || []);
    setGalleryPreviews(offer.images || []);
    
    const triple = offer.pricing.find(p => p.icon === 'triple');
    const double = offer.pricing.find(p => p.icon === 'double');
    const single = offer.pricing.find(p => p.icon === 'single');
    setTriplePrice(triple?.price.toString() || '');
    setDoublePrice(double?.price.toString() || '');
    setSinglePrice(single?.price.toString() || '');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle(''); setTitleEn(''); setDescription(''); setDescriptionEn(''); 
    setDuration(''); setDurationEn(''); setAccommodation(''); setAccommodationEn('');
    setFeatures(['']); setFeaturesEn(['']); setMainImage(''); setGalleryImages([]);
    setMainImagePreview(''); setGalleryPreviews([]);
    setTriplePrice(''); setDoublePrice(''); setSinglePrice('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const pricing: PricingTier[] = [
        { icon: 'triple', price: Number(triplePrice), label: 'triple' },
        { icon: 'double', price: Number(doublePrice), label: 'double' },
        { icon: 'single', price: Number(singlePrice), label: 'single' },
      ];

      const method = editingId ? 'PUT' : 'POST';
      const body = editingId 
        ? {
            id: editingId,
            title, titleEn, description, descriptionEn, duration, durationEn, 
            accommodation, accommodationEn,
            features: features.filter(f => f.trim()),
            featuresEn: featuresEn.filter(f => f.trim()),
            image: mainImage, images: galleryImages, pricing,
          }
        : {
            title, titleEn, description, descriptionEn, duration, durationEn, 
            accommodation, accommodationEn,
            features: features.filter(f => f.trim()),
            featuresEn: featuresEn.filter(f => f.trim()),
            image: mainImage, images: galleryImages, pricing,
          };

      const response = await fetch('/api/umrah', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setSuccess(editingId ? t('dashboard.offerUpdated') : t('dashboard.offerAdded'));
        setTitle(''); setTitleEn(''); setDescription(''); setDescriptionEn(''); 
        setDuration(''); setDurationEn(''); setAccommodation(''); setAccommodationEn('');
        setFeatures(['']); setFeaturesEn(['']); setMainImage(''); setGalleryImages([]);
        setMainImagePreview(''); setGalleryPreviews([]);
        setTriplePrice(''); setDoublePrice(''); setSinglePrice('');
        setEditingId(null);
        fetchOffers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json();
        setError(data.error || t('common.error'));
      }
    } catch (err) {
      setError(t('common.error'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('dashboard.deleteOfferConfirm'))) return;
    try {
      const response = await fetch(`/api/umrah?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        setSuccess(t('dashboard.offerDeleted'));
        fetchOffers();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(t('common.error'));
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
              <span>{t('dashboard.newsBoard')}</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>{t('dashboard.logout')}</span>
            </button>
          </div>

          <div className="flex justify-center items-center mb-6">
            <div></div>
            <div className="inline-flex items-center justify-center gap-3 px-6 py-2.5 bg-gradient-to-r from-gold-start/10 via-gold-end/10 to-gold-start/10 border border-gold-start/30 rounded-full">
              <Sparkles className="w-5 h-5 text-gold-start" />
              <span className="golden-text text-lg font-semibold">{t('dashboard.controlPanel')}</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            {t('dashboard.umrahManagement')}
            <span className="block golden-text mt-2">{t('dashboard.hajjManagement')}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-gold-start to-gold-end rounded-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{t('dashboard.addUmrahOffer')}</h2>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.offerTitle')} (عربي)</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.offerTitle')} (English)</label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                    placeholder="English title (optional)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.description')} (عربي)</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.description')} (English)</label>
                  <textarea
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none resize-none"
                    placeholder="English description (optional)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.duration')} (عربي)</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder={t('dashboard.durationPlaceholder')}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.duration')} (English)</label>
                  <input
                    type="text"
                    value={durationEn}
                    onChange={(e) => setDurationEn(e.target.value)}
                    placeholder="Example: 10 days / 9 nights"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.accommodation')} (عربي)</label>
                  <input
                    type="text"
                    value={accommodation}
                    onChange={(e) => setAccommodation(e.target.value)}
                    placeholder={t('dashboard.accommodationPlaceholder')}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.accommodation')} (English)</label>
                  <input
                    type="text"
                    value={accommodationEn}
                    onChange={(e) => setAccommodationEn(e.target.value)}
                    placeholder="Example: 5-star hotels"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.features')} (عربي)</label>
                  {features.map((f, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={f}
                        onChange={(e) => { const nf = [...features]; nf[i] = e.target.value; setFeatures(nf); }}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                        placeholder={`${t('dashboard.featurePlaceholder')} ${i + 1}`}
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
                    <span>{t('dashboard.addFeature')}</span>
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.features')} (English)</label>
                  {featuresEn.map((f, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={f}
                        onChange={(e) => { const nf = [...featuresEn]; nf[i] = e.target.value; setFeaturesEn(nf); }}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                        placeholder={`Feature ${i + 1} (optional)`}
                      />
                      {featuresEn.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setFeaturesEn(featuresEn.filter((_, idx) => idx !== i))}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setFeaturesEn([...featuresEn, ''])}
                    className="mt-2 flex items-center gap-2 px-4 py-2 text-gold-start hover:bg-gold-start/10 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t('dashboard.addFeature')}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.pricing')}</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-sm font-medium text-gray-700">{t('dashboard.triple')}</span>
                    <input
                      type="number"
                      value={triplePrice}
                      onChange={(e) => setTriplePrice(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-sm font-medium text-gray-700">{t('dashboard.double')}</span>
                    <input
                      type="number"
                      value={doublePrice}
                      onChange={(e) => setDoublePrice(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-start focus:border-transparent transition-all outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-20 text-sm font-medium text-gray-700">{t('dashboard.single')}</span>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.mainImage')}</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('dashboard.galleryImages')}</label>
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

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting || uploadingImages}
                  className="flex-1 bg-gradient-to-r from-gold-start to-gold-end text-white py-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t('dashboard.adding')}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>{editingId ? t('dashboard.editOfferButton') : t('dashboard.addOffer')}</span>
                    </>
                  )}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={submitting}
                    className="px-6 py-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
                  >
                    {t('dashboard.cancelEdit')}
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-gold-start to-gold-end rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">{t('dashboard.currentOffers')}</h2>
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
                              {p.label === 'single' || p.label === 'double' || p.label === 'triple' 
                                ? t(`offers.pricing.${p.label}`)
                                : p.label}: {p.price}{t('offers.currency')}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(offer)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          title={t('dashboard.edit')}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(offer.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {offers.length === 0 && (
                  <div className="text-center py-12">
                    <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">{t('dashboard.noOffers')}</p>
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
