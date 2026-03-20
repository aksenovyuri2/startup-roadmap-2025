import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Lightbulb, Globe, Diamond, DollarSign, BarChart3, Layout, ClipboardList, LogOut } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
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

export default function Sidebar() {
  const { logout } = useAuth();
  return (
    <nav className="flex flex-col gap-1 p-5 h-full overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-black text-gray-900 px-3 tracking-tight">ROADMAP</h2>
        <p className="text-xs text-gray-400 px-3 mt-0.5">12 недель до 50 юзеров</p>
      </div>

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
