import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, Target, AlertTriangle, Diamond, Info, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';
import ChecklistItem from '../components/ChecklistItem';
import DataTable from '../components/DataTable';
import { useProgress } from '../context/ProgressContext';
import { useGame } from '../context/GameContext';
import { weeks, phases } from '../data/roadmap';

const phaseColors = {
  1: '#0066ff',
  2: '#6c3bff',
  3: '#00a67e',
};

const gateWeeks = [2, 4, 8, 12];

export default function WeekPage() {
  const { weekId } = useParams();
  const id = Number(weekId);
  const week = weeks[id];
  const { getWeekProgress } = useProgress();
  const { unlockAchievement } = useGame();
  const confettiFired = useRef(false);

  const progress = getWeekProgress(id);

  useEffect(() => {
    if (progress.total > 0 && progress.done === progress.total && !confettiFired.current) {
      confettiFired.current = true;
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      unlockAchievement('week_done');
    }
    if (progress.done < progress.total) {
      confettiFired.current = false;
    }
  }, [progress.done, progress.total, unlockAchievement]);

  if (!week) {
    return (
      <PageTransition>
        <div className="text-center py-20 text-gray-400">Неделя не найдена</div>
      </PageTransition>
    );
  }

  const phase = phases.find((p) => p.weeks.includes(id));
  const color = phaseColors[week.phase];
  const prevWeek = id > 1 ? id - 1 : null;
  const nextWeek = id < 12 ? id + 1 : null;

  let taskIndex = 0;

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Phase badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color }}
          >
            {phase?.title}
          </span>
        </motion.div>

        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">{week.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {week.hours}
            </span>
            <span className="flex items-center gap-1.5">
              <Target size={14} />
              {week.goal}
            </span>
          </div>
        </div>

        {/* Progress */}
        <GlassCard className="!p-4">
          <ProgressBar done={progress.done} total={progress.total} label="Прогресс недели" color={color} />
        </GlassCard>

        {/* Sections */}
        {week.sections.map((section, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + si * 0.08 }}
          >
            <GlassCard className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
              {section.description && (
                <p className="text-sm text-gray-500">{section.description}</p>
              )}

              <div className="space-y-1">
                {section.tasks.map((task) => {
                  const idx = taskIndex++;
                  return <ChecklistItem key={task.id} id={task.id} text={task.text} index={idx} />;
                })}
              </div>

              {section.tips && (
                <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-100 space-y-2">
                  <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">Ключевые вопросы</p>
                  {section.tips.map((tip, i) => (
                    <p key={i} className="text-sm text-gray-600 italic">{tip}</p>
                  ))}
                </div>
              )}

              {section.note && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Info size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{section.note}</p>
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}

        {/* Stacks table (week 5) */}
        {week.stacks && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <GlassCard className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Sparkles size={18} style={{ color }} />
                Рекомендуемые стеки для РФ
              </h2>
              <DataTable
                columns={['Тип продукта', 'Фронт', 'AI API', 'Склейка']}
                rows={week.stacks.map((s) => [s.type, s.front, s.ai, s.glue])}
              />
            </GlassCard>
          </motion.div>
        )}

        {/* Final check (week 12) */}
        {week.finalCheck && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <GlassCard className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Финальная проверка</h2>
              <div className="space-y-1">
                {week.finalCheck.map((task, i) => (
                  <ChecklistItem key={task.id} id={task.id} text={task.text} index={i} />
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Risk warning */}
        {week.risk && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-100">
              <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-amber-700">Риск</p>
                <p className="text-sm text-gray-600">{week.risk}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gate check link */}
        {gateWeeks.includes(id) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <Link to={`/gate/${id}`}>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-violet-50 border border-violet-100 hover:bg-violet-100/60 transition-colors cursor-pointer">
                <Diamond size={18} className="text-violet-600" />
                <span className="text-sm font-semibold text-violet-700">Пройти Gate-проверку после этой недели</span>
                <ChevronRight size={16} className="text-violet-400 ml-auto" />
              </div>
            </Link>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6">
          {prevWeek ? (
            <Link
              to={`/week/${prevWeek}`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors font-medium"
            >
              <ChevronLeft size={16} />
              Неделя {prevWeek}
            </Link>
          ) : <div />}
          {nextWeek ? (
            <Link
              to={`/week/${nextWeek}`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors font-medium"
            >
              Неделя {nextWeek}
              <ChevronRight size={16} />
            </Link>
          ) : <div />}
        </div>
      </div>
    </PageTransition>
  );
}
