import { motion } from 'framer-motion';

export default function ProgressBar({ done, total, label, color = '#0066ff', size = 'h-1.5' }) {
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{label}</span>
          <span className="text-sm font-semibold text-gray-900">{done}/{total} ({percent}%)</span>
        </div>
      )}
      <div className={`w-full ${size} bg-gray-100 rounded-full overflow-hidden`}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
