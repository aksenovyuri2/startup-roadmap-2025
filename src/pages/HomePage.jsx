import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Target, TrendingUp } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import MetricCard from '../components/MetricCard';
import ProgressBar from '../components/ProgressBar';
import { useProgress } from '../context/ProgressContext';
import { introMetrics } from '../data/roadmap';

export default function HomePage() {
  const { getOverallProgress } = useProgress();
  const overall = getOverallProgress();

  return (
    <PageTransition>
      <div className="space-y-10">
        {/* Hero */}
        <div className="text-center space-y-4 py-8">
          <motion.h1
            className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ROADMAP
          </motion.h1>
          <motion.p
            className="text-xl text-gray-500 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            От нуля до 50 юзеров за 12 недель
          </motion.p>
          <motion.p
            className="text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            AI-стартап &bull; Solo founder &bull; No-code &bull; {introMetrics.time} &bull; {introMetrics.budget}
          </motion.p>
        </div>

        {/* Progress */}
        {overall.done > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard>
              <ProgressBar done={overall.done} total={overall.total} label="Общий прогресс" />
            </GlassCard>
          </motion.div>
        )}

        {/* Metrics */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MetricCard value="50" label="Юзеров" color="#0066ff" />
          <MetricCard value="12" label="Недель" color="#6c3bff" />
          <MetricCard value="150к" label="Бюджет, ₽" color="#00a67e" />
          <MetricCard value="5" label="Вернулись" color="#f59e0b" />
        </motion.div>

        {/* Phases overview */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { phase: 1, title: 'Исследование', weeks: '1–4', color: '#0066ff', icon: Target },
            { phase: 2, title: 'MVP и лонч', weeks: '5–8', color: '#6c3bff', icon: TrendingUp },
            { phase: 3, title: 'Growth-спринт', weeks: '9–12', color: '#00a67e', icon: ArrowRight },
          ].map((p, i) => (
            <motion.div
              key={p.phase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <Link to={`/week/${p.phase === 1 ? 1 : p.phase === 2 ? 5 : 9}`}>
                <GlassCard hover className="text-center space-y-3 cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl mx-auto flex items-center justify-center" style={{ background: `${p.color}10` }}>
                    <p.icon size={20} style={{ color: p.color }} />
                  </div>
                  <h3 className="font-bold text-gray-900">Фаза {p.phase}</h3>
                  <p className="text-sm text-gray-500">{p.title}</p>
                  <p className="text-xs text-gray-400">Недели {p.weeks}</p>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            to="/week/1"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-all duration-200 text-sm"
          >
            Начать
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </PageTransition>
  );
}
