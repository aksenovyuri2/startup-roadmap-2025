import { motion } from 'framer-motion';

export default function MetricCard({ value, label, color = '#0066ff' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 text-center"
    >
      <div className="text-3xl font-black" style={{ color }}>
        {value}
      </div>
      <div className="text-sm text-gray-500 mt-1 font-medium">{label}</div>
    </motion.div>
  );
}
