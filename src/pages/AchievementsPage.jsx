import { motion } from 'framer-motion';
import { Lock, Flame, Zap, Star } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useGame, ACHIEVEMENTS, LEVELS } from '../context/GameContext';
import { useProgress } from '../context/ProgressContext';

export default function AchievementsPage() {
  const { totalXP, levelInfo, streak, unlockedAchievements } = useGame();
  const { getOverallProgress } = useProgress();
  const { current, next, progress, xpInLevel, xpToNext } = levelInfo;
  const overall = getOverallProgress();
  const unlockedCount = Object.keys(unlockedAchievements).length;

  return (
    <PageTransition>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <div className="section-label mb-2">Геймификация</div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Достижения</h1>
        </div>

        {/* Player profile card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 text-white"
          style={{ background: 'linear-gradient(135deg, #0f1117 0%, #1e1b4b 100%)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
            >
              🚀
            </motion.div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-0.5">Уровень {current.level}</div>
              <div className="text-2xl font-black">{current.name}</div>
              <div className="text-sm text-white/50">{totalXP} XP всего</div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { icon: Zap, label: 'Опыт', value: `${totalXP} XP`, color: '#60a5fa' },
              { icon: Flame, label: 'Стрик', value: `${streak.current} дн.`, color: '#fb923c' },
              { icon: Star, label: 'Достижений', value: `${unlockedCount}/${ACHIEVEMENTS.length}`, color: '#a78bfa' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <s.icon size={16} className="mx-auto mb-1.5" style={{ color: s.color }} />
                <div className="text-sm font-black text-white">{s.value}</div>
                <div className="text-xs text-white/35 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* XP progress bar */}
          {next ? (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/50">До уровня «{next.name}»</span>
                <span className="text-white/60 font-semibold">{xpInLevel} / {xpToNext} XP</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <motion.div
                  className="h-full rounded-full relative"
                  style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                >
                  <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }} />
                </motion.div>
              </div>
              <div className="text-right text-xs text-white/30 mt-1">{progress}%</div>
            </div>
          ) : (
            <div className="text-center py-2 text-yellow-300 font-bold">🏆 Максимальный уровень достигнут!</div>
          )}
        </motion.div>

        {/* Streak info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="section-label mb-1">Серия дней подряд</div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">🔥</span>
                <span className="text-3xl font-black text-gray-900">{streak.current}</span>
                <span className="text-lg text-gray-500 font-medium">дней</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400 mb-1">Максимум</div>
              <div className="text-xl font-black text-gray-700">{streak.max} дн.</div>
            </div>
          </div>
          {streak.current === 0 && (
            <p className="text-sm text-gray-400 mt-3 p-3 bg-gray-50 rounded-xl">
              Выполни хотя бы одну задачу сегодня, чтобы начать серию 🎯
            </p>
          )}
        </motion.div>

        {/* Achievements grid */}
        <div>
          <div className="section-label mb-3">Все достижения · {unlockedCount}/{ACHIEVEMENTS.length}</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ACHIEVEMENTS.map((a, i) => {
              const unlocked = !!unlockedAchievements[a.id];
              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                  className="glass-card p-4 relative overflow-hidden"
                  style={unlocked ? { border: '1px solid rgba(37,99,235,0.2)', background: 'linear-gradient(135deg, rgba(37,99,235,0.03), rgba(124,58,237,0.03))' } : { opacity: 0.5 }}
                >
                  {!unlocked && (
                    <div className="absolute top-2.5 right-2.5">
                      <Lock size={12} className="text-gray-400" />
                    </div>
                  )}
                  <div className="text-3xl mb-2" style={{ filter: unlocked ? 'none' : 'grayscale(100%)' }}>
                    {a.emoji}
                  </div>
                  <div className={`text-sm font-bold mb-0.5 ${unlocked ? 'text-gray-900' : 'text-gray-400'}`}>
                    {a.title}
                  </div>
                  <div className="text-xs text-gray-400">{a.desc}</div>
                  {unlocked && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl" style={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed)' }} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Levels table */}
        <div>
          <div className="section-label mb-3">Таблица уровней</div>
          <div className="glass-card overflow-hidden">
            {LEVELS.map((lvl, i) => {
              const isCurrentLevel = lvl.level === current.level;
              const isPassed = lvl.level < current.level;
              return (
                <motion.div
                  key={lvl.level}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.03 }}
                  className={`flex items-center justify-between px-5 py-3 border-b border-gray-50 last:border-0 ${isCurrentLevel ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0"
                      style={{
                        background: isCurrentLevel ? 'linear-gradient(135deg, #2563eb, #7c3aed)' : isPassed ? '#f0fdf4' : '#f9fafb',
                        color: isCurrentLevel ? 'white' : isPassed ? '#059669' : '#d1d5db',
                      }}
                    >
                      {isPassed ? '✓' : lvl.level}
                    </div>
                    <div>
                      <div className={`text-sm font-semibold ${isCurrentLevel ? 'text-blue-700' : isPassed ? 'text-gray-600' : 'text-gray-400'}`}>
                        {lvl.name}
                      </div>
                      {isCurrentLevel && (
                        <div className="text-xs text-blue-500 font-medium">← Ты здесь</div>
                      )}
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${isCurrentLevel ? 'text-blue-600' : isPassed ? 'text-emerald-600' : 'text-gray-300'}`}>
                    {lvl.xpRequired} XP
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Overall progress */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-5"
        >
          <div className="section-label mb-2">Прогресс роадмапа</div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-2xl font-black text-gray-900">{overall.percent}%</div>
            <div className="text-sm text-gray-500">{overall.done} / {overall.total} задач</div>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed, #059669)' }}
              initial={{ width: 0 }}
              animate={{ width: `${overall.percent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            />
          </div>
        </motion.div>

      </div>
    </PageTransition>
  );
}
