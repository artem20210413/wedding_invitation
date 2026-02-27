import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MapPin, Clock, Camera, Gift, Music, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScratchCard } from './components/ScratchCard';
import { FortuneTeller } from './components/FortuneTeller';
import { CalendarButton } from './components/CalendarButton';
import { WeddingMap } from './components/WeddingMap';

export default function App() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const weddingDate = "2026-05-30T13:15:00.000Z";
  const weddingEndDate = "2026-05-30T23:00:00.000Z";

  const galleryImages = [1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 3, 4].map((seed, i) => ({
    src: `https://picsum.photos/seed/wedding-story-${seed}/600/800`,
    alt: `Story ${i + 1}`
  }));

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % galleryImages.length));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen bg-wedding-cream">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/wedding1/1920/1080?blur=2"
            alt="Wedding Background"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-wedding-cream"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 text-center px-4"
        >
          <span className="text-wedding-gold uppercase tracking-[0.3em] text-sm font-semibold mb-4 block">
            Ми одружуємось
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-stone-800 mb-6">
            Артем <span className="text-wedding-rose">&</span> Ольга
          </h1>
          <div className="flex items-center justify-center gap-4 text-stone-600 font-serif italic text-2xl">
            <div className="h-px w-12 bg-wedding-gold/40"></div>
            30 Травня 2026
            <div className="h-px w-12 bg-wedding-gold/40"></div>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-wedding-gold"
        >
          <Heart className="w-6 h-6 fill-current" />
        </motion.div>
      </section>

      {/* Invitation Text */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-serif text-stone-800">Дорогі друзі та рідні!</h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            Ми з великою радістю запрошуємо вас розділити з нами цей особливий день. 
            Ваша присутність зробить наше свято по-справжньому незабутнім. 
            Давайте разом створимо історію нашого кохання!
          </p>
          
          <div className="pt-8">
            <CalendarButton 
              title="Весілля Артема та Ольги"
              description="Ми чекаємо на вас на нашому святі!"
              location="Ресторан 'HayLoft 2.0', ВДНГ, Київ"
              startDate={weddingDate}
              endDate={weddingEndDate}
            />
          </div>
        </motion.div>
      </section>

      {/* Interactive Scratch Card */}
      <section className="bg-stone-100 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-stone-800 mb-4">Таємний блок</h2>
          <p className="text-stone-600 mb-12">Зітріть захисний шар, щоб дізнатись пароль, на вечірці будуть питати!</p>
          
          <div className="flex justify-center">
            <ScratchCard width={320} height={180}>
              <div className="text-center">
                <p className="text-wedding-gold font-bold text-sm uppercase tracking-widest mb-2">Ваш пароль:</p>
                <p className="text-3xl font-serif text-stone-800">ЩОСЬДИВНЕ</p>
              </div>
            </ScratchCard>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-white rounded-3xl shadow-sm border border-stone-100 text-center"
          >
            <Clock className="w-10 h-10 text-wedding-gold mx-auto mb-6" />
            <h3 className="text-xl font-serif mb-4">Розклад</h3>
            <ul className="text-stone-600 space-y-2">
              <li>13:30 — Церемонія</li>
              <li>14:30 — Фуршет</li>
              <li>15:30 — Банкет</li>
            </ul>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-white rounded-3xl shadow-sm border border-stone-100 text-center"
          >
            <Gift className="w-10 h-10 text-wedding-gold mx-auto mb-6" />
            <h3 className="text-xl font-serif mb-4">Побажання</h3>
            <p className="text-stone-600">
              Ваша присутність — найкращий подарунок. Але якщо ви хочете подарувати щось більше, ми будемо вдячні за внесок у нашу майбутню подорож.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-8 bg-white rounded-3xl shadow-sm border border-stone-100 text-center"
          >
            <Music className="w-10 h-10 text-wedding-gold mx-auto mb-6" />
            <h3 className="text-xl font-serif mb-4">Дрес-код</h3>
            <p className="text-stone-600">
              Black Tie Optional. Ми будемо раді бачити вас у вечірньому вбранні. Основні кольори: золото, беж та оливковий.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fortune Teller */}
      {/* <section className="py-24 px-6 bg-wedding-sage/10">
        <div className="max-w-xl mx-auto">
          <FortuneTeller />
        </div>
      </section> */}

 {/* Map Section */}
      <section className="py-24 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <MapPin className="w-8 h-8 text-wedding-gold" />
            <h2 className="text-4xl font-serif text-stone-800">Локація</h2>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-xl font-serif text-stone-800 mb-2">Ресторан "HayLoft 2.0"</h3>
                <p
                  className="text-stone-600 hover:text-wedding-gold transition-colors"
                >Проспект Академіка Глушкова</p>
                <a
                  href="https://maps.app.goo.gl/Ub84nYQ8G8occxmE8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 hover:text-wedding-gold transition-colors"
                >Google Maps</a>
              </div>
              {/* <div className="p-4 bg-white rounded-2xl border border-stone-200">
                <p className="text-sm text-stone-500 italic">
                  "Поруч є велика парковка для гостей. Якщо ви плануєте бути на власному авто, будь ласка, повідомте нас заздалегідь."
                </p>
              </div> */}
            </div>
            
            <div className="lg:col-span-2">
              <WeddingMap 
                center={[50.37849867697693, 30.476147913165853]} 
                markers={[
                  {
                    position: [50.37849867697693, 30.476147913165853],
                    title: "ЗАГС №1",
                    description: "Місце проведення церемонії"
                  },
                  {
                    position: [50.3795358456134, 30.47716174128199],
                    title: "Ресторан 'HayLoft 2.0'",
                    description: "Місце проведення банкету"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Camera className="w-8 h-8 text-wedding-gold" />
            <h2 className="text-4xl font-serif text-stone-800">Наша історія</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="aspect-[3/4] rounded-2xl overflow-hidden bg-stone-200 cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                <img 
                  src={img.src} 
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 text-white/70 hover:text-white p-2 hidden md:block z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={nextImage}
              className="absolute right-4 text-white/70 hover:text-white p-2 hidden md:block z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
     

      {/* Footer */}
      <footer className="py-24 px-6 text-center border-t border-stone-200">
        <h2 className="text-4xl font-serif text-stone-800 mb-4">Чекаємо на вас!</h2>
        <p className="text-stone-500 italic">З любов'ю, Артєм та Ольга</p>
        <div className="mt-12 flex justify-center gap-2">
          <Heart className="w-4 h-4 text-wedding-rose fill-current" />
          <Heart className="w-4 h-4 text-wedding-rose fill-current" />
          <Heart className="w-4 h-4 text-wedding-rose fill-current" />
        </div>
      </footer>
    </div>
  );
}
