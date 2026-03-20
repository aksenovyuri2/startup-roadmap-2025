import { motion } from 'framer-motion';
import { Globe, Info } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import DataTable from '../components/DataTable';
import { russianSpecifics } from '../data/roadmap';

export default function RussianSpecificsPage() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Российская специфика</h1>

        {/* AI APIs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Доступ к AI API из России</h2>
            <DataTable
              columns={['Вариант', 'Плюсы', 'Минусы']}
              rows={russianSpecifics.aiApis.map((a) => [a.name, a.pros, a.cons])}
            />
            <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-100">
              <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">{russianSpecifics.aiRecommendation}</p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Platforms */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <GlassCard className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Площадки</h2>
            <DataTable
              columns={['Задача', 'Западный аналог', 'Российская альтернатива']}
              rows={russianSpecifics.platforms.map((p) => [p.task, p.western, p.russian])}
            />
          </GlassCard>
        </motion.div>

        {/* Legal */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <GlassCard className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Юридическое оформление</h2>
            <p className="text-sm text-gray-500">На стадии MVP не нужно регистрировать юрлицо. Оформляй когда появится первая выручка.</p>
            <DataTable
              columns={['Форма', 'Когда', 'Плюсы']}
              rows={russianSpecifics.legal.map((l) => [l.form, l.when, l.pros])}
            />
          </GlassCard>
        </motion.div>
      </div>
    </PageTransition>
  );
}
