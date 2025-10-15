import { motion } from "framer-motion";
import { useState } from "react";
import { Play, X, Video } from "lucide-react";

interface VideoItem {
  id: string;
  embedUrl: string;
  title?: string;
}

interface VideoGalleryProps {
  videos: VideoItem[];
}

export default function VideoGallery({
  videos = [],
}: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const openVideoModal = (video: VideoItem) => {
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
  };

  const getGridClasses = () => {
    return 'grid grid-cols-1 lg:grid-cols-2';
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className={`${getGridClasses()} gap-8 w-full min-h-[40vh]`}>
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            className="group cursor-pointer"
            onClick={() => openVideoModal(video)}
          >
            <div className="h-full relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
              {/* Thumbnail with Play Button */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 overflow-hidden flex items-center justify-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>

                {/* Play Button */}
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center shadow-2xl"
                  >
                    <Play className="w-12 h-12 md:w-14 md:h-14 text-gray-900 ml-1" fill="currentColor" />
                  </motion.div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>

                {/* Type Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full flex items-center gap-1">
                  <Video className="w-3 h-3 text-amber-400" />
                  <span className="text-xs text-white font-semibold">فيديو</span>
                </div>
              </div>

              {/* Title (if provided) */}
              {video.title && (
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-base">
                    {video.title}
                  </h3>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeVideoModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-7xl bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Video Player */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={selectedVideo.embedUrl}
                className="absolute top-0 left-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>

            {/* Video Info (if available) */}
            {selectedVideo.title && (
              <div className="p-4 sm:p-6 bg-white">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 w-full">
                  {selectedVideo.title}
                </h3>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

// Example usage:
// const videos = [
//   {
//     id: '1',
//     embedUrl: 'https://drive.google.com/file/d/YOUR_FILE_ID/preview',
//     title: 'Video Title',
//     description: 'Video description'
//   }
// ];
// 
// <VideoGallery videos={videos} columns={{ sm: 2, lg: 3, xl: 4 }} />
