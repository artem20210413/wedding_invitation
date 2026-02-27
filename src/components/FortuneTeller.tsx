import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const predictions = [
  "Ви виграєте битву за букет! 💐",
  "Сьогодні ви вип'єте 3 келихи шампанського! 🥂",
  "Ваш танець стане легендою вечора. 💃",
  "Ви знайдете нового друга за столом. 🤝",
  "Ваша посмішка буде на кожному другому фото. 📸",
  "Ви першим підете танцювати! 🕺",
  "На вас чекає найсмачніший шматочок торта. 🍰",
  "Ви почуєте найкращий тост вечора. 🎤",
  "Сьогодні зірки обіцяють вам море веселощів! ✨",
  "Ви станете душею компанії сьогодні. 🌟"
];

export const FortuneTeller: React.FC = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const getPrediction = () => {
    setIsSpinning(true);
    setPrediction(null);
    
    setTimeout(() => {
      const random = predictions[Math.floor(Math.random() * predictions.length)];
      setPrediction(random);
      setIsSpinning(false);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FDFBF7', '#E2A79D']
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-wedding-gold/20 shadow-lg">
      <h3 className="text-2xl font-serif italic text-stone-700">Передбачення на вечір</h3>
      
      <div className="h-24 flex items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          {isSpinning ? (
            <motion.div
              key="spinning"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-12 h-12 text-wedding-gold" />
            </motion.div>
          ) : prediction ? (
            <motion.p
              key="prediction"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-medium text-stone-800"
            >
              {prediction}
            </motion.p>
          ) : (
            <p className="text-stone-400 italic">Натисніть кнопку, щоб дізнатись свою долю...</p>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={getPrediction}
        disabled={isSpinning}
        className="px-8 py-3 bg-wedding-gold text-white rounded-full font-medium shadow-md hover:bg-wedding-gold/90 transition-all active:scale-95 disabled:opacity-50"
      >
        {prediction ? "Спробувати ще раз" : "Отримати передбачення"}
      </button>
    </div>
  );
};
