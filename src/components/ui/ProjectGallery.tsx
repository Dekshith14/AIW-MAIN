import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface ProjectGalleryProps {
  mainImage: string;
  gallery?: string[];
  title: string;
}

const ProjectGallery = ({ mainImage, gallery = [], title }: ProjectGalleryProps) => {
  const allImages = [mainImage, ...gallery];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setIsLightboxOpen(false);
  };

  // If only one image, show simple view
  if (allImages.length === 1) {
    return (
      <div className="relative h-[70vh] md:h-[80vh] cursor-zoom-in" onClick={() => setIsLightboxOpen(true)}>
        <img
          src={mainImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        <button
          className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-full opacity-0 hover:opacity-100 transition-opacity"
          aria-label="View fullscreen"
        >
          <ZoomIn size={20} />
        </button>
        
        {/* Lightbox for single image */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center"
              onClick={() => setIsLightboxOpen(false)}
            >
              <button
                className="absolute top-6 right-6 p-2 text-foreground hover:text-accent transition-colors"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close"
              >
                <X size={32} />
              </button>
              <img
                src={mainImage}
                alt={title}
                className="max-w-[90vw] max-h-[90vh] object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0} className="outline-none">
      {/* Main Image */}
      <div 
        className="relative h-[60vh] md:h-[70vh] cursor-zoom-in group"
        onClick={() => setIsLightboxOpen(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={allImages[selectedIndex]}
            alt={`${title} - Image ${selectedIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {/* Navigation arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
          {selectedIndex + 1} / {allImages.length}
        </div>
        
        {/* Zoom hint */}
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn size={20} />
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all ${
                index === selectedIndex
                  ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                  : "opacity-60 hover:opacity-100"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
            onKeyDown={handleKeyDown}
          >
            <button
              className="absolute top-6 right-6 p-2 text-foreground hover:text-accent transition-colors z-10"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close"
            >
              <X size={32} />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-muted/80 backdrop-blur-sm p-4 rounded-full hover:bg-muted transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
            
            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              src={allImages[selectedIndex]}
              alt={`${title} - Image ${selectedIndex + 1}`}
              className="max-w-[85vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-muted/80 backdrop-blur-sm p-4 rounded-full hover:bg-muted transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            {/* Lightbox counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-muted/80 backdrop-blur-sm px-6 py-3 rounded-full text-lg">
              {selectedIndex + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGallery;
