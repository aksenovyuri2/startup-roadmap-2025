import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Link2, FileText, PenLine } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useProgress } from '../context/ProgressContext';
import { useGame } from '../context/GameContext';
import TaskDetailPanel, { StatusBadge } from './TaskDetailPanel';

function fireConfetti(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;
  confetti({
    particleCount: 45,
    spread: 60,
    origin: { x, y },
    colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'],
    scalar: 0.85,
    ticks: 90,
    gravity: 0.9,
  });
}

export default function ChecklistItem({ id, text, index = 0 }) {
  const { isChecked, toggleTask, getTaskDetail, getOverallProgress } = useProgress();
  const { addXP } = useGame();
  const checked = isChecked(id);
  const [expanded, setExpanded] = useState(false);
  const [justChecked, setJustChecked] = useState(false);

  const handleToggle = (e) => {
    const wasChecked = checked;
    toggleTask(id);
    const { done } = getOverallProgress();
    const newDone = wasChecked ? done - 1 : done + 1;
    addXP(wasChecked ? -10 : 10, newDone);

    if (!wasChecked) {
      fireConfetti(e);
      setJustChecked(true);
      setTimeout(() => setJustChecked(false), 600);
    }
  };

  const detail = getTaskDetail(id);
  const hasData = detail.notes || detail.links?.length > 0 || detail.status !== 'todo';
  const hasLinks = detail.links?.length > 0;

  return (
    <div className="border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-3 py-2.5">
        {/* Checkbox */}
        <motion.button
          onClick={handleToggle}
          animate={justChecked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer"
          style={{
            borderColor: checked ? '#0066ff' : '#d1d5db',
            background: checked ? '#0066ff' : 'transparent',
            boxShadow: justChecked ? '0 0 0 4px rgba(59,130,246,0.2)' : 'none',
          }}
        >
          <motion.svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            initial={false}
            animate={checked ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
          >
            <motion.path
              d="M2 6L4.5 8.5L10 3"
              stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: checked ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            />
          </motion.svg>
        </motion.button>

        {/* Text */}
        <div className="flex-1 min-w-0 space-y-1">
          <motion.span
            animate={checked ? { opacity: 0.45 } : { opacity: 1 }}
            className={`text-sm leading-relaxed transition-colors duration-200 block ${
              checked ? 'line-through text-gray-400' : 'text-gray-700'
            }`}
          >
            {text}
          </motion.span>

          {/* Inline badges when data exists */}
          {hasData && (
            <div className="flex flex-wrap gap-1.5">
              <StatusBadge status={detail.status} />
              {hasLinks && (
                <span className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">
                  <Link2 size={10} />
                  {detail.links.length} ссылок
                </span>
              )}
              {detail.notes && (
                <span className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">
                  <FileText size={10} />
                  заметка
                </span>
              )}
            </div>
          )}
        </div>

        {/* Always-visible expand button */}
        <button
          onClick={() => setExpanded((v) => !v)}
          title="Добавить заметку, статус, ссылки"
          className={`flex-shrink-0 flex items-center gap-1 text-xs px-2 py-1 rounded-lg border transition-all duration-200 cursor-pointer mt-0.5 ${
            expanded
              ? 'bg-blue-50 text-blue-600 border-blue-200'
              : hasData
              ? 'bg-gray-50 text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-500'
              : 'bg-white text-gray-300 border-gray-200 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50'
          }`}
        >
          <PenLine size={12} />
          <span className="hidden sm:inline">{hasData ? 'Изменить' : 'Заметка'}</span>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={11} />
          </motion.div>
        </button>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {expanded && (
          <TaskDetailPanel
            key={id}
            taskId={id}
            onClose={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
