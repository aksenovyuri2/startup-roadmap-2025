import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Lightbulb, Globe, Diamond, DollarSign, BarChart3, Layout, ClipboardList, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useGame, ACHIEVEMENTS } from '../context/GameContext';
import { phases } from '../data/roadmap';

const phaseColors = {
  1: { active: 'border-blue-600 text-blue-600', text: 'text-blue-600' },
  2: { active: 'border-violet-600 text-violet-600', text: 'text-violet-600' },
  3: { active: 'border-emerald-600 text-emerald-600', text: 'text-emerald-600' },
};

const gateWeeks = [2, 4, 8, 12];

function NavItem({ to, icon: Icon, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
          isActive
            ? 'bg-gray-900 text-white font-medium'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`
      }
    >
      <Icon size={16} />
      <span>{label}</span>
    </NavLink>
  );
}

function WeekLink({ weekId, phaseId }) {
  const { getWeekProgress } = useProgress();
  const { done, total } = getWeekProgress(weekId);
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <NavLink
      to={`/week/${weekId}`}
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ml-2 ${
          isActive
            ? 'bg-gray-100 text-gray-900 font-medium'
            : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
        }`
      }
    >
      <span>Неделя {weekId}</span>
      {percent > 0 && (
        <span className={`text-xs font-medium ${percent === 100 ? 'text-emerald-600' : 'text-gray-400'}`}>
          {done}/{total}
        </span>
      )}
    </NavLink>
  );
}

const DAILY_GOAL = 5; // tasks per day

function getMascot(streak, progress) {
  if (progress === 100) return { emoji: '🦁', mood: 'Ты лев! Всё выполнено!' };
  if (streak >= 7) return { emoji: '🔥', mood: 'Огненная серия!' };
  if (streak >= 3) return { emoji: '⚡', mood: 'В ударе!' };
  if (progress >= 50) return { emoji: '💪', mood: 'Хорошая работа!' };
  return { emoji: '🚀', mood: 'Вперёд, основатель!' };
}

function DailyGoal() {
  const { getTodayCount } = useProgress();
  const doneToday = getTodayCount();
  const pct = Math.min(100, Math.round((doneToday / DAILY_GOAL) * 100));
  const done = doneToday >= DAILY_GOAL;

  return (
    <div className="mx-3 mb-3 p-3 rounded-2xl border"
      style={{ background: done ? 'linear-gradient(135deg, #d1fae5, #a7f3d0)' : 'linear-gradient(135deg, #fef9c3, #fef08a)', borderColor: done ? '#6ee7b7' : '#fde047' }}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-xs font-bold" style={{ color: done ? '#065f46' : '#854d0e' }}>
          {done ? '✅ Дневная цель!' : '🎯 Цель на сегодня'}
        </div>
        <div className="text-xs font-bold" style={{ color: done ? '#065f46' : '#854d0e' }}>
          {Math.min(doneToday, DAILY_GOAL)}/{DAILY_GOAL}
        </div>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: done ? '#6ee7b7' : '#fde68a' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: done ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #f59e0b, #d97706)' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

function XPBar() {
  const { totalXP, levelInfo, streak, unlockedAchievements } = useGame();
  const { getOverallProgress } = useProgress();
  const { current, next, progress, xpInLevel, xpToNext } = levelInfo;
  const unlockedCount = Object.keys(unlockedAchievements).length;
  const { percent } = getOverallProgress();
  const mascot = getMascot(streak.current, percent);

  return (
    <div className="mx-3 mb-3 p-3 rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100">
      {/* Mascot + level row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
          >
            {mascot.emoji}
          </motion.div>
          <div>
            <div className="text-xs font-bold text-gray-800">{current.name}</div>
            <div className="text-xs text-gray-400">{mascot.mood}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-lg mb-0.5">
            <span className="text-sm">🔥</span>
            <span className="text-xs font-bold text-orange-700">{streak.current} дн.</span>
          </div>
          <div className="text-xs text-gray-400 text-center">{totalXP} XP</div>
        </div>
      </div>

      {/* Level badge */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
          {current.level}
        </div>
        <div className="flex-1">
          {next && (
            <>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>до «{next.name}»</span>
                <span>{xpInLevel}/{xpToNext} XP</span>
              </div>
              <div className="h-2.5 bg-white rounded-full overflow-hidden border border-blue-100 relative">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                {/* Shine */}
                <div className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)' }} />
              </div>
            </>
          )}
          {!next && (
            <div className="text-xs font-bold text-purple-600">🏆 Максимальный уровень!</div>
          )}
        </div>
      </div>

      {/* Achievements mini-row */}
      {unlockedCount > 0 && (
        <div className="flex flex-wrap gap-1 pt-1 border-t border-blue-100">
          {ACHIEVEMENTS.filter(a => unlockedAchievements[a.id]).slice(0, 6).map(a => (
            <motion.span
              key={a.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              title={a.title}
              className="text-sm cursor-default"
            >{a.emoji}</motion.span>
          ))}
          {unlockedCount > 6 && <span className="text-xs text-gray-400 self-center">+{unlockedCount - 6}</span>}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const { logout } = useAuth();
  return (
    <nav className="flex flex-col gap-1 p-5 h-full overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-xl font-black text-gray-900 px-3 tracking-tight">ROADMAP</h2>
        <p className="text-xs text-gray-400 px-3 mt-0.5">12 недель до 50 юзеров</p>
      </div>

      <XPBar />
      <DailyGoal />

      <NavItem to="/" icon={Home} label="Главная" end />
      <NavItem to="/how-to-use" icon={BookOpen} label="Как работать" />
      <NavItem to="/principles" icon={Lightbulb} label="Принципы" />
      <NavItem to="/russian-specifics" icon={Globe} label="Российская специфика" />

      <div className="h-px bg-gray-100 my-3" />

      {phases.map((phase) => (
        <div key={phase.id} className="mb-2">
          <div className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${phaseColors[phase.id].text}`}>
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
                      isActive ? 'text-amber-600 font-medium' : 'text-gray-400 hover:text-amber-600'
                    }`
                  }
                >
                  <Diamond size={10} />
                  <span>Gate-проверка</span>
                </NavLink>
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="h-px bg-gray-100 my-3" />

      <NavItem to="/budget" icon={DollarSign} label="Бюджет" />
      <NavItem to="/funnel" icon={BarChart3} label="Воронка" />
      <NavItem to="/overview" icon={Layout} label="Дашборд" />
      <NavItem to="/summary" icon={ClipboardList} label="Сводка" />

      <div className="mt-auto pt-4">
        <div className="h-px bg-gray-100 mb-3" />
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut size={16} />
          <span>Выйти</span>
        </button>
      </div>
    </nav>
  );
}
