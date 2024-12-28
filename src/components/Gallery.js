import React, { useState } from 'react';

const photos = [
  { src: '/images/JCB-Excavator-Rental-Rayong.jpg', alt: 'JCB Excavator Rental Rayong' },
  { src: '/images/Heavy-Equipment-Rental-Bangkok.jpg', alt: 'Heavy Equipment Rental Bangkok' },
  { src: '/images/excavator2.jpg', alt: 'Excavator 2' },
  { src: '/images/excavator3.jpg', alt: 'Excavator 3' },
  { src: '/images/Loader-Machine-Chon-Buri.jpg', alt: 'Loader Machine Chon Buri' },
  { src: '/images/เช่ารถขุด-JCB-งานขุดเจาะ-กรุงเทพ copy.jpeg', alt: 'JCB Excavator Rental Bangkok Copy' },
  { src: '/images/เช่ารถขุด-JCB-งานขุดเจาะ-กรุงเทพ.jpg', alt: 'JCB Excavator Rental Bangkok' },
  // Removed photo6.jpg and photo7.jpg
  // ...more images...
].filter(photo => photo.src);

const Gallery = ({ lang }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleClose = () => setSelectedIndex(-1);
  const handlePrev = () =>
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  const handleNext = () =>
    setSelectedIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          {lang === 'th' ? 'แกลอรี่' : 'Gallery'}
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => setSelectedIndex(idx)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedIndex >= 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            ✕
          </button>
          <button
            onClick={handlePrev}
            className="absolute left-4 text-white text-3xl"
          >
            ‹
          </button>
          <img
            src={photos[selectedIndex].src}
            alt={photos[selectedIndex].alt}
            className="max-h-full max-w-full object-contain"
          />
          <button
            onClick={handleNext}
            className="absolute right-4 text-white text-3xl"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
