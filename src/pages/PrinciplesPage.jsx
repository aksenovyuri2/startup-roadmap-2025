import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import { principles } from '../data/roadmap';

const colors = ['#0066ff', '#6c3bff', '#00a67e', '#f59e0b'];

export default function PrinciplesPage() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Принципы</h1>

        <div className="grid sm:grid-cols-2 gap-4">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="h-full space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: colors[i] }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-gray-900">{p.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{p.text}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
