import { motion } from 'motion/react';
import { Heart, MapPin, Clock, Camera, Gift, Music } from 'lucide-react';
import { ScratchCard } from './components/ScratchCard';
import { FortuneTeller } from './components/FortuneTeller';
import { CalendarButton } from './components/CalendarButton';
import { WeddingMap } from './components/WeddingMap';

export default function App() {
  const weddingDate = "2026-06-20T14:00:00.000Z";
  const weddingEndDate = "2026-06-20T23:00:00.000Z";

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
            Олександр <span className="text-wedding-rose">&</span> Марія
          </h1>
          <div className="flex items-center justify-center gap-4 text-stone-600 font-serif italic text-2xl">
            <div className="h-px w-12 bg-wedding-gold/40"></div>
            20 Червня 2026
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
              title="Весілля Олександра та Марії"
              description="Ми чекаємо на вас на нашому святі!"
              location="Ресторан 'Золотий Сад', вул. Квіткова, 12"
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
          <p className="text-stone-600 mb-12">Зітріть захисний шар, щоб дізнатись пароль для входу на вечірку!</p>
          
          <div className="flex justify-center">
            <ScratchCard width={320} height={180}>
              <div className="text-center">
                <p className="text-wedding-gold font-bold text-sm uppercase tracking-widest mb-2">Ваш пароль:</p>
                <p className="text-3xl font-serif text-stone-800">КОХАННЯ2026</p>
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
              <li>14:00 — Церемонія</li>
              <li>15:30 — Фуршет</li>
              <li>17:00 — Банкет</li>
              <li>22:00 — Торт</li>
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
      <section className="py-24 px-6 bg-wedding-sage/10">
        <div className="max-w-xl mx-auto">
          <FortuneTeller />
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
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="aspect-[3/4] rounded-2xl overflow-hidden bg-stone-200"
              >
                <img 
                  src={`https://picsum.photos/seed/wedding-story-${i}/600/800`} 
                  alt={`Story ${i}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
                <h3 className="text-xl font-serif text-stone-800 mb-2">Ресторан "Золотий Сад"</h3>
                <p className="text-stone-600">вул. Квіткова, 12, Київ</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-stone-200">
                <p className="text-sm text-stone-500 italic">
                  "Поруч є велика парковка для гостей. Якщо ви плануєте бути на власному авто, будь ласка, повідомте нас заздалегідь."
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <WeddingMap 
                center={[50.4501, 30.5234]} 
                markers={[
                  {
                    position: [50.4501, 30.5234],
                    title: "Ресторан 'Золотий Сад'",
                    description: "Місце проведення банкету та церемонії"
                  },
                  {
                    position: [50.4510, 30.5245],
                    title: "Парковка",
                    description: "Безкоштовна парковка для гостей"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 text-center border-t border-stone-200">
        <h2 className="text-4xl font-serif text-stone-800 mb-4">Чекаємо на вас!</h2>
        <p className="text-stone-500 italic">З любов'ю, Олександр та Марія</p>
        <div className="mt-12 flex justify-center gap-2">
          <Heart className="w-4 h-4 text-wedding-rose fill-current" />
          <Heart className="w-4 h-4 text-wedding-rose fill-current" />
          <Heart className="w-4 h-4 text-wedding-rose fill-current" />
        </div>
      </footer>
    </div>
  );
}
