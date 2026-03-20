import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Link2, ChevronRight, ClipboardList, AlertCircle, CheckCircle2, Ban, Clock } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GlassCard from '../components/GlassCard';
import { StatusBadge } from '../components/TaskDetailPanel';
import { useProgress } from '../context/ProgressContext';
import { weeks, phases } from '../data/roadmap';

const phaseColors = { 1: '#0066ff', 2: '#6c3bff', 3: '#00a67e' };

// Flatten all tasks from all weeks
function getAllTasksFlat() {
  const result = [];
  Object.values(weeks).forEach((week) => {
    const allTasks = [
      ...(week.sections?.flatMap((s) => s.tasks) || []),
      ...(week.finalCheck || []),
    ];
    allTasks.forEach((task) => {
      result.push({ ...task, weekId: week.id, weekTitle: week.title, phase: week.phase });
    });
  });
  return result;
}

const STATUS_COUNTS_CONFIG = [
  { value: 'in_progress', label: 'В работе',    icon: AlertCircle,   color: 'text-blue-600',   bg: 'bg-blue-50' },
  { value: 'done',        label: 'Готово',      icon: CheckCircle2,  color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { value: 'blocked',     label: 'Заблокировано', icon: Ban,          color: 'text-red-500',    bg: 'bg-red-50' },
  { value: 'todo',        label: 'Не начато',   icon: Clock,         color: 'text-gray-400',   bg: 'bg-gray-50' },
];

export default function SummaryPage() {
  const { getTaskDetail, taskDetails } = useProgress();
  const allTasks = getAllTasksFlat();

  // Tasks that have any data
  const tasksWithData = allTasks.filter((t) => {
    const d = getTaskDetail(t.id);
    return d.notes || d.links?.length > 0 || d.status !== 'todo';
  });

  // Count by status across all tasks
  const statusCounts = STATUS_COUNTS_CONFIG.map((sc) => ({
    ...sc,
    count: allTasks.filter((t) => getTaskDetail(t.id).status === sc.value).length,
  }));

  // Group tasks with data by week
  const byWeek = {};
  tasksWithData.forEach((t) => {
    if (!byWeek[t.weekId]) byWeek[t.weekId] = [];
    byWeek[t.weekId].push(t);
  });
  const weekIds = Object.keys(byWeek).map(Number).sort((a, b) => a - b);

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Сводка</h1>
          <p className="text-sm text-gray-400 mt-1">Все пункты, по которым есть статус, заметки или ссылки</p>
        </div>

        {/* Status overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statusCounts.map((sc, i) => {
            const Icon = sc.icon;
            return (
              <motion.div
                key={sc.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <GlassCard className={`flex flex-col items-center gap-2 py-4 ${sc.count === 0 ? 'opacity-40' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl ${sc.bg} flex items-center justify-center`}>
                    <Icon size={18} className={sc.color} />
                  </div>
                  <div className="text-2xl font-black text-gray-900">{sc.count}</div>
                  <div className="text-xs text-gray-400 text-center font-medium">{sc.label}</div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {tasksWithData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 space-y-4"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
              <ClipboardList size={28} className="text-gray-300" />
            </div>
            <div>
              <p className="text-gray-400 font-medium">Пока нет данных</p>
              <p className="text-sm text-gray-300 mt-1">
                Открой любую неделю, кликни на стрелку рядом с задачей и заполни информацию
              </p>
            </div>
            <Link
              to="/week/1"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Начать с Недели 1
              <ChevronRight size={16} />
            </Link>
          </motion.div>
        )}

        {/* Tasks grouped by week */}
        {weekIds.map((wId, wi) => {
          const weekTasks = byWeek[wId];
          const week = weeks[wId];
          const phase = phases.find((p) => p.weeks.includes(wId));
          const color = phaseColors[week.phase];

          return (
            <motion.div
              key={wId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: wi * 0.07 }}
            >
              <GlassCard className="space-y-4">
                {/* Week header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color }}>
                      {phase?.title}
                    </span>
                    <h2 className="text-base font-bold text-gray-900 mt-0.5">{week.title}</h2>
                  </div>
                  <Link
                    to={`/week/${wId}`}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors font-medium"
                  >
                    Открыть
                    <ChevronRight size={12} />
                  </Link>
                </div>

                <div className="space-y-3">
                  {weekTasks.map((task) => {
                    const detail = getTaskDetail(task.id);
                    return (
                      <div
                        key={task.id}
                        className="rounded-xl border border-gray-100 bg-gray-50/60 p-3 space-y-2"
                      >
                        {/* Task text + status */}
                        <div className="flex items-start gap-2">
                          <StatusBadge status={detail.status} />
                          <p className="text-sm text-gray-700 leading-relaxed flex-1">{task.text}</p>
                        </div>

                        {/* Notes */}
                        {detail.notes && (
                          <div className="flex items-start gap-2 pl-1">
                            <FileText size={13} className="text-gray-300 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-500 whitespace-pre-wrap">{detail.notes}</p>
                          </div>
                        )}

                        {/* Links */}
                        {detail.links?.length > 0 && (
                          <div className="flex flex-wrap gap-2 pl-1">
                            {detail.links.map((link, li) => (
                              <div key={li} className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 rounded-lg px-2.5 py-1 max-w-xs">
                                <Link2 size={10} className="text-blue-400 flex-shrink-0" />
                                {link.startsWith('http') ? (
                                  <a href={link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate">
                                    {link}
                                  </a>
                                ) : (
                                  <span className="text-gray-600 truncate">{link}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </PageTransition>
  );
}
