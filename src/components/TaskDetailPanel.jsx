import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Link2, FileText, AlertCircle, Clock, CheckCircle2, Ban } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

const STATUSES = [
  { value: 'todo',        label: 'Не начато',   icon: Clock,         color: 'text-gray-400',   bg: 'bg-gray-100',    border: 'border-gray-200' },
  { value: 'in_progress', label: 'В работе',    icon: AlertCircle,   color: 'text-blue-600',   bg: 'bg-blue-50',     border: 'border-blue-200' },
  { value: 'done',        label: 'Готово',      icon: CheckCircle2,  color: 'text-emerald-600', bg: 'bg-emerald-50',  border: 'border-emerald-200' },
  { value: 'blocked',     label: 'Заблокировано', icon: Ban,          color: 'text-red-500',    bg: 'bg-red-50',      border: 'border-red-200' },
];

export function StatusBadge({ status, compact = false }) {
  const s = STATUSES.find((x) => x.value === status) || STATUSES[0];
  const Icon = s.icon;
  if (compact) {
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-md ${s.bg} ${s.color} border ${s.border}`}>
        <Icon size={10} />
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${s.bg} ${s.color} border ${s.border}`}>
      <Icon size={12} />
      {s.label}
    </span>
  );
}

export default function TaskDetailPanel({ taskId, onClose }) {
  const { getTaskDetail, setTaskDetail } = useProgress();
  const detail = getTaskDetail(taskId);

  const [notes, setNotes] = useState(detail.notes || '');
  const [links, setLinks] = useState(detail.links || []);
  const [newLink, setNewLink] = useState('');
  const [status, setStatus] = useState(detail.status || 'todo');

  const save = (updates) => {
    setTaskDetail(taskId, updates);
  };

  const handleStatusChange = (val) => {
    setStatus(val);
    save({ status: val, notes, links });
  };

  const handleNotesBlur = () => {
    save({ status, notes, links });
  };

  const addLink = () => {
    const trimmed = newLink.trim();
    if (!trimmed) return;
    const updated = [...links, trimmed];
    setLinks(updated);
    setNewLink('');
    save({ status, notes, links: updated });
  };

  const removeLink = (i) => {
    const updated = links.filter((_, idx) => idx !== i);
    setLinks(updated);
    save({ status, notes, links: updated });
  };

  const handleLinkKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addLink(); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="overflow-hidden"
    >
      <div className="mt-2 ml-8 rounded-xl border border-gray-100 bg-gray-50/80 p-4 space-y-4">

        {/* Status */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Статус</p>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => {
              const Icon = s.icon;
              const active = status === s.value;
              return (
                <button
                  key={s.value}
                  onClick={() => handleStatusChange(s.value)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    active ? `${s.bg} ${s.color} ${s.border} shadow-sm` : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
                  }`}
                >
                  <Icon size={12} />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <FileText size={12} />
            Заметки
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={handleNotesBlur}
            placeholder="Что сделано, что не работает, решения, идеи..."
            rows={3}
            className="w-full text-sm text-gray-700 bg-white border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder-gray-300"
          />
        </div>

        {/* Links */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <Link2 size={12} />
            Ссылки и документы
          </p>
          <AnimatePresence>
            {links.map((link, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2 group"
              >
                <div className="flex-1 flex items-center gap-2 text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 min-w-0">
                  <Link2 size={10} className="text-blue-400 flex-shrink-0" />
                  {link.startsWith('http') ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline truncate"
                    >
                      {link}
                    </a>
                  ) : (
                    <span className="text-gray-600 truncate">{link}</span>
                  )}
                </div>
                <button
                  onClick={() => removeLink(i)}
                  className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                >
                  <X size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="flex gap-2">
            <input
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyDown={handleLinkKeyDown}
              placeholder="Вставьте ссылку или название документа..."
              className="flex-1 text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder-gray-300"
            />
            <button
              onClick={addLink}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all cursor-pointer"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            Свернуть
          </button>
        </div>
      </div>
    </motion.div>
  );
}
