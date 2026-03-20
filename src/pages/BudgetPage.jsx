import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import { budgetTable } from '../data/roadmap';

export default function BudgetPage() {
  return (
    <PageTransition>
      <div className="space-y-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Бюджет: 50 000–150 000 ₽ на 3 месяца</h1>

        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider border-b border-gray-100">Инструмент</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider border-b border-gray-100">Стоимость</th>
                  <th className="text-center px-4 py-3 text-gray-500 font-medium text-xs uppercase tracking-wider border-b border-gray-100">Оплата из РФ</th>
                </tr>
              </thead>
              <tbody>
                {budgetTable.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-700 font-medium">{row.tool}</td>
                    <td className="px-4 py-3 text-gray-600">{row.cost}</td>
                    <td className="px-4 py-3 text-center">
                      {row.ruPayment ? (
                        <Check size={16} className="mx-auto text-emerald-500" />
                      ) : (
                        <X size={16} className="mx-auto text-red-400" />
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard className="text-center">
          <p className="text-3xl font-black text-gray-900">40 000–130 000 ₽</p>
          <p className="text-sm text-gray-500 mt-1">Итого за 3 месяца — в рамках бюджета</p>
        </GlassCard>

        <div className="space-y-2">
          <p className="text-xs text-gray-400">* Если нет иностранной карты: Tilda + Albato + YandexGPT покрывают 90% задач.</p>
          <p className="text-xs text-gray-400">** OpenAI даёт лучшее качество — с этим бюджетом можешь себе позволить.</p>
          <p className="text-xs text-gray-400">*** Реклама только на неделях 10–11, когда продукт уже работает.</p>
        </div>
      </div>
    </PageTransition>
  );
}
