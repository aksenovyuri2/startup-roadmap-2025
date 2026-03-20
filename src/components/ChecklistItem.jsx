import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Link2, FileText, PenLine } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import TaskDetailPanel, { StatusBadge } from './TaskDetailPanel';

export default function ChecklistItem({ id, text, index = 0 }) {
  const { isChecked, toggleTask, getTaskDetail } = useProgress();
  const checked = isChecked(id);
  const [expanded, setExpanded] = useState(false);

  const detail = getTaskDetail(id);
  const hasData = detail.notes || detail.links?.length > 0 || detail.status !== 'todo';
  const hasLinks = detail.links?.length > 0;

  return (
    <div className="border-b border-gray-100 last:border-0">
      <div className="flex items-start gap-3 py-2.5">
        {/* Checkbox */}
        <button
          onClick={() => toggleTask(id)}
          className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer"
          style={{
            borderColor: checked ? '#0066ff' : '#d1d5db',
            background: checked ? '#0066ff' : 'transparent',
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
        </button>

        {/* Text */}
        <div className="flex-1 min-w-0 space-y-1">
          <span className={`text-sm leading-relaxed transition-all duration-200 ${
            checked ? 'text-gray-400 line-through' : 'text-gray-700'
          }`}>
            {text}
          </span>

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
