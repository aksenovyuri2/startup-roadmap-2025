import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Diamond, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import { gateChecks } from '../data/roadmap';

export default function GateCheckPage() {
  const { gateId } = useParams();
  const id = Number(gateId);
  const gate = gateChecks[id];

  if (!gate) {
    return (
      <PageTransition>
        <div className="text-center py-20 text-gray-400">Gate-проверка не найдена</div>
      </PageTransition>
    );
  }

  const nextWeek = id < 12 ? id + 1 : null;

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="text-center space-y-4 py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto"
          >
            <Diamond size={32} className="text-amber-500" />
          </motion.div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">{gate.title}</h1>
        </div>

        <GlassCard className="space-y-6 text-center">
          <p className="text-lg text-gray-700 font-semibold">{gate.question}</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-3"
            >
              <CheckCircle2 className="mx-auto text-emerald-500" size={28} />
              <p className="text-sm font-bold text-emerald-700">ДА</p>
              <p className="text-sm text-gray-600">{gate.yes}</p>
              {nextWeek && (
                <Link
                  to={`/week/${nextWeek}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors mt-2"
                >
                  Перейти к неделе {nextWeek}
                  <ArrowRight size={12} />
                </Link>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-5 rounded-2xl bg-red-50 border border-red-100 space-y-3"
            >
              <XCircle className="mx-auto text-red-400" size={28} />
              <p className="text-sm font-bold text-red-600">НЕТ</p>
              <p className="text-sm text-gray-600">{gate.no}</p>
            </motion.div>
          </div>
        </GlassCard>

        <div className="text-center">
          <Link
            to={`/week/${id}`}
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors font-medium"
          >
            &larr; Вернуться к неделе {id}
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
