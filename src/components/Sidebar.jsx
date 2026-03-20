import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Lightbulb, Globe, Diamond, DollarSign, BarChart3, Layout, ClipboardList, LogOut, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useGame, ACHIEVEMENTS } from '../context/GameContext';
import { phases } from '../data/roadmap';

const phaseColors = {
  1: { text: '#60a5fa', dot: '#2563eb' },
  2: { text: '#a78bfa', dot: '#7c3aed' },
  3: { text: '#34d399', dot: '#059669' },
};

const gateWeeks = [2, 4, 8, 12];

const DAILY_GOAL = 5;

function NavItem({ to, icon: Icon, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-white/10 text-white'
            : 'text-white/50 hover:text-white/90 hover:bg-white/5'
        }`
      }
    >
      <Icon size={15} strokeWidth={2} />
      <span>{label}</span>
    </NavLink>
  );
}

function WeekLink({ weekId, phaseId }) {
  const { getWeekProgress } = useProgress();
  const { done, total } = getWeekProgress(weekId);
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const color = phaseColors[phaseId];

  return (
    <NavLink
      to={`/week/${weekId}`}
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ml-2 ${
          isActive
            ? 'bg-white/10 text-white font-medium'
            : 'text-white/40 hover:text-white/80 hover:bg-white/5'
        }`
      }
    >
      <span>Неделя {weekId}</span>
      {percent > 0 && (
        <span className="text-xs font-semibold" style={{ color: percent === 100 ? color.text : 'rgba(255,255,255,0.3)' }}>
          {done}/{total}
        </span>
      )}
    </NavLink>
  );
}

function DailyGoal() {
  const { getTodayCount } = useProgress();
  const doneToday = getTodayCount();
  const pct = Math.min(100, Math.round((doneToday / DAILY_GOAL) * 100));
  const done = doneToday >= DAILY_GOAL;

  return (
    <div className="mx-3 mb-2 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
          {done ? '✅ Цель дня' : '🎯 Цель дня'}
        </span>
        <span className="text-xs font-bold" style={{ color: done ? '#34d399' : '#fbbf24' }}>
          {Math.min(doneToday, DAILY_GOAL)}/{DAILY_GOAL}
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: done ? 'linear-gradient(90deg, #10b981, #34d399)' : 'linear-gradient(90deg, #f59e0b, #fbbf24)' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

function getMascot(streak, percent) {
  if (percent === 100) return { emoji: '🦁', mood: 'Всё выполнено!' };
  if (streak >= 7) return { emoji: '🔥', mood: 'Огненная серия!' };
  if (streak >= 3) return { emoji: '⚡', mood: 'В ударе!' };
  if (percent >= 50) return { emoji: '💪', mood: 'Хорошая работа!' };
  return { emoji: '🚀', mood: 'Вперёд!' };
}

function XPBar() {
  const { totalXP, levelInfo, streak, unlockedAchievements } = useGame();
  const { getOverallProgress } = useProgress();
  const { current, next, progress, xpInLevel, xpToNext } = levelInfo;
  const unlockedCount = Object.keys(unlockedAchievements).length;
  const { percent } = getOverallProgress();
  const mascot = getMascot(streak.current, percent);

  return (
    <div className="mx-3 mb-2 p-3 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.3), rgba(124,58,237,0.3))', border: '1px solid rgba(255,255,255,0.1)' }}>
      {/* Mascot + level */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <motion.div
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
          >
            {mascot.emoji}
          </motion.div>
          <div>
            <div className="text-sm font-bold text-white leading-tight">{current.name}</div>
            <div className="text-xs text-white/40">{mascot.mood}</div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="flex items-center gap-1 justify-end mb-0.5">
            <span className="text-base">🔥</span>
            <span className="text-sm font-bold text-orange-300">{streak.current}</span>
          </div>
          <div className="text-xs text-white/30">{totalXP} XP</div>
        </div>
      </div>

      {/* Level number + XP bar */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.15)' }}>
          {current.level}
        </div>
        <div className="flex-1 min-w-0">
          {next ? (
            <>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/30 truncate">→ {next.name}</span>
                <span className="text-white/40 flex-shrink-0 ml-1">{xpInLevel}/{xpToNext}</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <motion.div
                  className="h-full rounded-full relative"
                  style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)' }} />
                </motion.div>
              </div>
            </>
          ) : (
            <div className="text-xs font-bold text-yellow-300">🏆 Макс. уровень!</div>
          )}
        </div>
      </div>

      {/* Achievements */}
      {unlockedCount > 0 && (
        <div className="flex flex-wrap gap-1 mt-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {ACHIEVEMENTS.filter(a => unlockedAchievements[a.id]).slice(0, 7).map(a => (
            <motion.span key={a.id} initial={{ scale: 0 }} animate={{ scale: 1 }} title={a.title} className="text-sm cursor-default">{a.emoji}</motion.span>
          ))}
          {unlockedCount > 7 && <span className="text-xs text-white/30 self-center">+{unlockedCount - 7}</span>}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const { logout } = useAuth();
  return (
    <nav className="flex flex-col gap-0.5 p-4 h-full overflow-y-auto" style={{ background: 'linear-gradient(180deg, #0f1117 0%, #141520 100%)' }}>
      {/* Logo */}
      <div className="mb-4 px-3 pt-1">
        <h2 className="text-lg font-black text-white tracking-tight">СТАРТАП</h2>
        <p className="text-xs text-white/30 mt-0.5">12 недель · 50 юзеров</p>
      </div>

      <XPBar />
      <DailyGoal />

      <div className="my-2" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

      <NavItem to="/" icon={Home} label="Главная" end />
      <NavItem to="/achievements" icon={Trophy} label="Достижения" />
      <NavItem to="/how-to-use" icon={BookOpen} label="Как работать" />
      <NavItem to="/principles" icon={Lightbulb} label="Принципы" />
      <NavItem to="/russian-specifics" icon={Globe} label="РФ-специфика" />

      <div className="my-2" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

      {phases.map((phase) => (
        <div key={phase.id} className="mb-1">
          <div className="px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ color: phaseColors[phase.id].text }}>
            Фаза {phase.id}
          </div>
          {phase.weeks.map((wId) => (
            <div key={wId}>
              <WeekLink weekId={wId} phaseId={phase.id} />
              {gateWeeks.includes(wId) && (
                <NavLink
                  to={`/gate/${wId}`}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-1 ml-4 rounded text-xs transition-all ${
                      isActive ? 'text-amber-300 font-medium' : 'text-white/25 hover:text-amber-300'
                    }`
                  }
                >
                  <Diamond size={9} />
                  <span>Gate-проверка</span>
                </NavLink>
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="my-2" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

      <NavItem to="/budget" icon={DollarSign} label="Бюджет" />
      <NavItem to="/funnel" icon={BarChart3} label="Воронка" />
      <NavItem to="/overview" icon={Layout} label="Дашборд" />
      <NavItem to="/summary" icon={ClipboardList} label="Сводка" />

      <div className="mt-auto pt-4">
        <div className="my-2" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut size={15} />
          <span>Выйти</span>
        </button>
      </div>
    </nav>
  );
}
