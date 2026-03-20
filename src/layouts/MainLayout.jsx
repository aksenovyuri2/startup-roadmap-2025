import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';
import XPToast from '../components/XPToast';
import LevelUpModal from '../components/LevelUpModal';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f7f7f8]">
      <AnimatedBackground />
      <ScrollToTop />
      <MobileNav />

      <div className="flex relative" style={{ zIndex: 1 }}>
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-72 fixed top-0 left-0 bottom-0 bg-white border-r border-gray-100">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:ml-72 min-h-screen pt-16 lg:pt-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            <Outlet />
          </div>
        </main>
      </div>
      <XPToast />
      <LevelUpModal />
    </div>
  );
}
