import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';
import { useProgress } from '../context/ProgressContext';
import { phases } from '../data/roadmap';

const phaseColors = { 1: '#0066ff', 2: '#6c3bff', 3: '#00a67e' };

export default function OverviewPage() {
  const { getOverallProgress, getPhaseProgress, getWeekProgress, resetAll } = useProgress();
  const overall = getOverallProgress();
  const percent = overall.total > 0 ? Math.round((overall.done / overall.total) * 100) : 0;

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Дашборд прогресса</h1>
          <button
            onClick={() => { if (window.confirm('Сбросить весь прогресс?')) resetAll(); }}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer font-medium"
          >
            <RotateCcw size={14} />
            Сбросить
          </button>
        </div>

        {/* Overall */}
        <GlassCard className="text-center space-y-4">
          <motion.div
            className="text-7xl font-black text-gray-900"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            {percent}%
          </motion.div>
          <p className="text-gray-500 font-medium">Общий прогресс</p>
          <ProgressBar done={overall.done} total={overall.total} />
        </GlassCard>

        {/* Phases */}
        <div className="grid sm:grid-cols-3 gap-4">
          {phases.map((phase, i) => {
            const prog = getPhaseProgress(phase.id);
            const pPercent = prog.total > 0 ? Math.round((prog.done / prog.total) * 100) : 0;
            const color = phaseColors[phase.id];
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="space-y-3">
                  <h3 className="font-bold text-gray-900 text-sm">Фаза {phase.id}</h3>
                  <p className="text-xs text-gray-400">{phase.subtitle}</p>
                  <div className="text-2xl font-black" style={{ color }}>
                    {pPercent}%
                  </div>
                  <ProgressBar done={prog.done} total={prog.total} color={color} />
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Week grid */}
        <GlassCard className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">По неделям</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((wId) => {
              const prog = getWeekProgress(wId);
              const wPercent = prog.total > 0 ? Math.round((prog.done / prog.total) * 100) : 0;
              const phase = phases.find((p) => p.weeks.includes(wId));
              const color = phase ? phaseColors[phase.id] : '#0066ff';
              return (
                <Link key={wId} to={`/week/${wId}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: wId * 0.03 }}
                    className="glass-card glass-card-hover p-3 text-center cursor-pointer"
                  >
                    <div className="text-xs text-gray-400 mb-1 font-medium">Н{wId}</div>
                    <div className="relative w-10 h-10 mx-auto">
                      <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                        <circle
                          cx="18" cy="18" r="15" fill="none"
                          stroke={wPercent === 100 ? '#00a67e' : color}
                          strokeWidth="3"
                          strokeDasharray={`${wPercent * 0.9425} 94.25`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
                        {wPercent}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
