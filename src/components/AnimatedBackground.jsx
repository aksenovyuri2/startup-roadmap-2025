import { motion } from 'framer-motion';

const blobs = [
  { color: '#0066ff', size: 600, x: [-80, 80, -80], y: [-40, 60, -40], duration: 30 },
  { color: '#6c3bff', size: 500, x: [60, -60, 60], y: [40, -80, 40], duration: 35 },
  { color: '#00a67e', size: 450, x: [-40, 100, -40], y: [80, -20, 80], duration: 25 },
];

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${15 + i * 25}%`,
            left: `${5 + i * 30}%`,
            width: blob.size,
            height: blob.size,
            background: blob.color,
            opacity: 0.04,
            filter: 'blur(120px)',
          }}
          animate={{ x: blob.x, y: blob.y }}
          transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
