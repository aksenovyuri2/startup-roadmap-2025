import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between"
        style={{ background: 'rgba(15,17,23,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <h2 className="text-sm font-black text-white tracking-tight">СТАРТАП</h2>
        <button
          onClick={() => setOpen(true)}
          className="text-white/60 hover:text-white transition-colors p-1"
        >
          <Menu size={22} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed left-0 top-0 bottom-0 w-72 z-50 lg:hidden shadow-2xl"
              style={{ background: '#0f1117' }}
            >
              <div className="flex justify-end p-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X size={22} />
                </button>
              </div>
              <div onClick={() => setOpen(false)}>
                <Sidebar />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
