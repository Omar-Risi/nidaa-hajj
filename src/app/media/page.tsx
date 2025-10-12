'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { Play, X, Video, Image as ImageIcon, Film } from "lucide-react";
import { Footer } from "@/components/footer";

interface MediaItem {
  id: string;
  type: 'video' | 'image';
  thumbnailUrl: string;
  embedUrl: string;
  title: string;
  description?: string;
}

export default function MediaPage() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  // Convert Google Drive links to embed format
  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'video',
      thumbnailUrl: '',
      embedUrl: 'https://drive.google.com/file/d/1ZK4JenLJfDsycF5_vvGzKYwzbaWdzsbc/preview',
      title: ''
    },
    {
      id: '2',
      type: 'video',
      thumbnailUrl: '',
      embedUrl: 'https://drive.google.com/file/d/18vQZXjf3kGbsh6YUHFcMbpZGKFfMGdhe/preview',
      title: ''
    },
    {
      id: '3',
      type: 'video',
      thumbnailUrl: '',
      embedUrl: 'https://drive.google.com/file/d/1y_hTjiSI5vLJxDcbXRi7gDtVDbdlrZS8/preview',
      title: ''
    },
    {
      id: '4',
      type: 'video',
      thumbnailUrl: '',
      embedUrl: 'https://drive.google.com/file/d/1VBY03CZcMVXJI18iaNahHzAvQ_ZKPYhv/preview',
      title: ''
    },
    {
      id: '5',
      type: 'video',
      thumbnailUrl: '',
      embedUrl: 'https://drive.google.com/file/d/1DPeWUhKGKHk9KjC5pAbVXUWcE1pvdhUi/preview',
      title: ''
    },
    {
      id: '6',
      type: 'video',
      thumbnailUrl: '',
      embedUrl: 'https://drive.google.com/file/d/1FG_OLOzvuo7s1_Bh0DJOVHT09dnOVQMB/preview',
      title: ''
    },
    {
      id: '7',
      type: 'video',
      thumbnailUrl: '',
      embedUrl: 'https://drive.google.com/file/d/19nLNTKqhQImB5tIEDLCgRrBGrNk1YSyI/preview',
      title: ''
    },
    {
      id: '8',
      type: 'video',
      thumbnailUrl: '',
      embedUrl: 'https://drive.google.com/file/d/1LRaCOI4v6JYj69fnllhL7U2dRBpUwXZn/preview',
      title: ''
    },
    {
      id: '9',
      type: 'video',
      thumbnailUrl: '',
      embedUrl: 'https://drive.google.com/file/d/1JMbbidKI_RnWdE-VSXcc6SEpgd5azYaO/preview',
      title: ''
    },
    {
      id: '10',
      type: 'video',
      thumbnailUrl: '',
      embedUrl: 'https://drive.google.com/file/d/1UvhMTrrcdvlsOts9FoR0Fk97O4J22hnl/preview',
      title: ''
    },
    {
      id: '11',
      type: 'video',
      thumbnailUrl: '',
      embedUrl: 'https://drive.google.com/file/d/18ihE7LqiPhsgyixfgVep0HI5ucOIZ5PW/preview',
      title: ''
    },
    {
      id: '12',
      type: 'video',
      thumbnailUrl: '',
      embedUrl: 'https://drive.google.com/file/d/1AHxlXxFe6B3MAZbR12woy6kJEzAZbgts/preview',
      title: ''
    },
    {
      id: '13',
      type: 'video',
      thumbnailUrl: '',
      embedUrl: 'https://drive.google.com/file/d/17astvAt5rdXNS78wKJ1b0nbTf8DkcgRA/preview',
      title: ''
    }
  ];

  const openMediaModal = (media: MediaItem) => {
    setSelectedMedia(media);
    document.body.style.overflow = 'hidden';
  };

  const closeMediaModal = () => {
    setSelectedMedia(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-gold-start/20 to-gold-end/20 border border-gold-start/50 rounded-full mb-6 backdrop-blur-sm">
              <Film className="w-5 h-5 text-gold-start" />
              <span className="golden-text text-lg font-semibold">معرض الوسائط</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              رحلاتنا المباركة
              <span className="block golden-text mt-3">في الصور والفيديو</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              شاهد لحظات روحانية وذكريات خالدة من رحلات العمرة والحج التي نظمتها مؤسسة النداء
            </p>

            <div className="flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-gold-start" />
                <span className="font-semibold">{mediaItems.length} فيديو</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gold-start"></div>
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-gold-start" />
                <span className="font-semibold">ذكريات مباركة</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Media Gallery */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              
            </motion.div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mediaItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                  onClick={() => openMediaModal(item)}
                >
                  <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
                    {/* Thumbnail with Play Button */}
                    <div className="relative aspect-video bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 overflow-hidden flex items-center justify-center">
                      {/* Kaaba/Mecca Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                          backgroundSize: '30px 30px'
                        }}></div>
                      </div>
                      
                      {/* Play Button - Always Visible */}
                      <div className="relative z-10">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-20 h-20 rounded-full bg-gradient-to-r from-gold-start to-gold-end flex items-center justify-center shadow-2xl"
                        >
                          <Play className="w-10 h-10 text-foreground ml-1" fill="currentColor" />
                        </motion.div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>

                      {/* Type Badge */}
                      <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full flex items-center gap-1">
                        <Video className="w-3 h-3 text-gold-start" />
                        <span className="text-xs text-white font-semibold">فيديو</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeMediaModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeMediaModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={selectedMedia.embedUrl}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CTA Section
      
      <section className="py-20 bg-gradient-to-br from-foreground to-foreground/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              كن جزءًا من رحلتنا القادمة
            </h2>
            <p className="text-xl text-white/90 mb-8">
              انضم إلينا في رحلة روحانية لا تُنسى واحجز مكانك الآن
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/offers"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-gold-start to-gold-end text-foreground font-bold rounded-xl hover:shadow-xl transition-all"
              >
                تصفح البرامج
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20"
              >
                تواصل معنا
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
       */}

      <Footer />
    </>
  );
}
