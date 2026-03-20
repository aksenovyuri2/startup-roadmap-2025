import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import { howToUse } from '../data/roadmap';

const icons = [CheckCircle2, RefreshCw, AlertTriangle];
const colors = ['#0066ff', '#6c3bff', '#f59e0b'];

export default function HowToUsePage() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Как работать с роудмапом</h1>
        </div>

        <div className="space-y-4">
          {howToUse.map((text, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `${colors[i]}10` }}>
                    <Icon size={16} style={{ color: colors[i] }} />
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">{text}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
