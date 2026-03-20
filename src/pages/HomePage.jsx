import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Target, TrendingUp, Zap, CheckCircle2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useProgress } from '../context/ProgressContext';
import { useGame } from '../context/GameContext';

const phases = [
  { phase: 1, title: 'Исследование', subtitle: 'Проблема, CJM, первые контакты', weeks: '1–4', weekStart: 1, color: '#2563eb', bg: 'rgba(37,99,235,0.08)', icon: Target },
  { phase: 2, title: 'MVP и лонч', subtitle: 'Сборка, тесты, первые юзеры', weeks: '5–8', weekStart: 5, color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', icon: TrendingUp },
  { phase: 3, title: 'Growth-спринт', subtitle: 'Итерации, каналы, метрики', weeks: '9–12', weekStart: 9, color: '#059669', bg: 'rgba(5,150,105,0.08)', icon: Zap },
];

export default function HomePage() {
  const { getOverallProgress, getPhaseProgress } = useProgress();
  const { totalXP, levelInfo, streak } = useGame();
  const overall = getOverallProgress();
  const { current } = levelInfo;

  return (
    <PageTransition>
      <div className="space-y-8">

        {/* Hero */}
        <div className="pt-4 pb-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="section-label mb-3">Стартап-роадмап</div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-3">
              От нуля до{' '}
              <span className="gradient-text">50 юзеров</span>
              {' '}за 12 недель
            </h1>
            <p className="text-base text-gray-500 max-w-lg">
              AI-стартап · Solo founder · Бюджет 150 000 ₽ · No-code инструменты
            </p>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {[
            { value: '50', label: 'Целевых юзеров', color: '#2563eb' },
            { value: '12', label: 'Недель', color: '#7c3aed' },
            { value: '150к', label: 'Бюджет, ₽', color: '#059669' },
            { value: '5+', label: 'Метрик возврата', color: '#d97706' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="glass-card p-4 text-center"
            >
              <div className="text-3xl font-black tracking-tight mb-0.5" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Overall progress (only if started) */}
        {overall.done > 0 && (
          <motion.div
            className="glass-card p-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="section-label mb-0.5">Общий прогресс</div>
                <div className="text-2xl font-black text-gray-900">{overall.percent}%</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-700">{overall.done} / {overall.total}</div>
                <div className="text-xs text-gray-400">задач выполнено</div>
              </div>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed, #059669)' }}
                initial={{ width: 0 }}
                animate={{ width: `${overall.percent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
          </motion.div>
        )}

        {/* Player card (if has XP) */}
        {totalXP > 0 && (
          <motion.div
            className="glass-card p-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{ background: 'linear-gradient(135deg, #0f1117, #1a1a2e)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                  🚀
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-0.5">Уровень {current.level}</div>
                  <div className="text-lg font-black text-white">{current.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-white">{totalXP}</div>
                <div className="text-xs text-white/40">XP · 🔥{streak.current}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Phases */}
        <div>
          <div className="section-label mb-3">Три фазы роадмапа</div>
          <div className="grid sm:grid-cols-3 gap-3">
            {phases.map((p, i) => {
              const { done, total } = getPhaseProgress(p.phase);
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;
              return (
                <motion.div
                  key={p.phase}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <Link to={`/week/${p.weekStart}`}>
                    <div className="glass-card glass-card-hover p-5 cursor-pointer h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: p.bg }}>
                          <p.icon size={18} style={{ color: p.color }} />
                        </div>
                        {pct === 100 && (
                          <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: p.color }}>
                        Фаза {p.phase} · Недели {p.weeks}
                      </div>
                      <div className="text-base font-bold text-gray-900 mb-1">{p.title}</div>
                      <div className="text-xs text-gray-500 mb-3">{p.subtitle}</div>
                      {done > 0 && (
                        <>
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>{done}/{total} задач</span>
                            <span>{pct}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: p.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 + i * 0.1 }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/week/1"
            className="inline-flex items-center gap-2 btn-primary text-sm"
          >
            {overall.done > 0 ? 'Продолжить' : 'Начать'}
            <ArrowRight size={15} />
          </Link>
        </motion.div>

      </div>
    </PageTransition>
  );
}
