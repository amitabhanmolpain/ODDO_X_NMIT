import React, { useEffect, useState } from 'react';

const slides = [
  { id: 1, title: '50% off on Jackets', subtitle: 'Stay warm with half price on selected jackets', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg' },
  { id: 2, title: 'Sell your used goods here', subtitle: 'Clean your room, earn cash — list in minutes', image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg' },
  { id: 3, title: 'Study Material Sale', subtitle: 'Bundles and notes at student-friendly prices', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg' },
];

const BannerCarousel = ({ interval = 3500 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(t);
  }, [interval]);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className="w-full relative bg-gray-800 rounded-lg overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`transition-all duration-500 ease-in-out ${i === index ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0 -translate-x-full'}`}
        >
          <div className="w-full h-48 md:h-56 lg:h-64 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-pink-600">
            <div className="max-w-4xl mx-auto flex items-center gap-6 px-6">
              <div className="text-white">
                <div className="text-2xl md:text-3xl font-bold">{s.title}</div>
                <div className="mt-2 text-sm md:text-base opacity-90">{s.subtitle}</div>
              </div>
              <div className="hidden md:block w-40 h-40 bg-white/10 rounded flex items-center justify-center">
                <img src={s.image} alt={s.title} className="max-h-36 object-contain" />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* controls */}
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full">
        ‹
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full">
        ›
      </button>

      {/* indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((s, i) => (
          <button key={s.id} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`} />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
