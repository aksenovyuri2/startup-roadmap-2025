import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import { funnelMath } from '../data/roadmap';

const barWidths = ['100%', '70%', '35%', '10%'];
const barColors = ['#0066ff', '#6c3bff', '#00a67e', '#f59e0b'];

export default function FunnelPage() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Математика воронки</h1>
        <p className="text-gray-500">Работаем от цели назад. Уточняй после недели 8 на основе реальных данных.</p>

        {/* Visual funnel */}
        <GlassCard className="space-y-5">
          {funnelMath.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              className="space-y-1.5"
            >
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 font-medium">{row.stage}</span>
                <span className="text-gray-500">
                  {row.conversion !== '—' && <span className="mr-3 text-gray-400">{row.conversion}</span>}
                  <span className="font-bold text-gray-900">{row.needed}</span>
                </span>
              </div>
              <div className="h-10 bg-gray-50 rounded-xl overflow-hidden">
                <motion.div
                  className="h-full rounded-xl flex items-center justify-end pr-4"
                  style={{ background: barColors[i] }}
                  initial={{ width: 0 }}
                  animate={{ width: barWidths[i] }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
                >
                  <span className="text-xs font-bold text-white">{row.needed}</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </GlassCard>

        <GlassCard>
          <p className="text-sm text-gray-500 text-center">
            Этот документ — живой. Заполняй заметки, отмечай чекбоксы, обновляй цифры.
          </p>
        </GlassCard>
      </div>
    </PageTransition>
  );
}
