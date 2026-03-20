import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

export default function XPToast() {
  const { xpToast, achievementToast, clearXPToast, clearAchievementToast } = useGame();

  useEffect(() => {
    if (xpToast) {
      const t = setTimeout(clearXPToast, 1600);
      return () => clearTimeout(t);
    }
  }, [xpToast, clearXPToast]);

  useEffect(() => {
    if (achievementToast) {
      const t = setTimeout(clearAchievementToast, 3000);
      return () => clearTimeout(t);
    }
  }, [achievementToast, clearAchievementToast]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {achievementToast && (
          <motion.div
            key={`ach-${achievementToast.id}`}
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border border-yellow-200/50"
            style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', minWidth: 220 }}
          >
            <span className="text-2xl">{achievementToast.emoji}</span>
            <div>
              <div className="text-xs font-semibold text-yellow-800 uppercase tracking-wider">Достижение!</div>
              <div className="text-sm font-bold text-yellow-900">{achievementToast.title}</div>
              <div className="text-xs text-yellow-700">{achievementToast.desc}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {xpToast && (
          <motion.div
            key={xpToast.id}
            initial={{ opacity: 0, y: 30, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl shadow-xl border border-blue-200/50"
            style={{ background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)' }}
          >
            <motion.span
              initial={{ rotate: -20 }}
              animate={{ rotate: 0 }}
              className="text-lg"
            >⚡</motion.span>
            <span className="text-base font-bold text-blue-700">
              +{xpToast.amount} XP
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
