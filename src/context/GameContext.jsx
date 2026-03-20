import { createContext, useContext, useCallback, useMemo, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const GameContext = createContext(null);

export const LEVELS = [
  { level: 1,  name: 'Идеолог',       xpRequired: 0 },
  { level: 2,  name: 'Исследователь', xpRequired: 100 },
  { level: 3,  name: 'Строитель',     xpRequired: 200 },
  { level: 4,  name: 'Запускатель',   xpRequired: 350 },
  { level: 5,  name: 'Тестировщик',   xpRequired: 500 },
  { level: 6,  name: 'Итератор',      xpRequired: 700 },
  { level: 7,  name: 'Стартапер',     xpRequired: 900 },
  { level: 8,  name: 'Продуктовик',   xpRequired: 1150 },
  { level: 9,  name: 'Питчер',        xpRequired: 1400 },
  { level: 10, name: 'Акселерат',     xpRequired: 1700 },
  { level: 11, name: 'Масштабировщик',xpRequired: 2050 },
  { level: 12, name: 'Инвестируемый', xpRequired: 2400 },
  { level: 13, name: 'Основатель',    xpRequired: 2800 },
];

export const ACHIEVEMENTS = [
  { id: 'first_task',   emoji: '🚀', title: 'Первый шаг',      desc: 'Выполнена первая задача' },
  { id: 'ten_tasks',    emoji: '💪', title: 'Разогрев',         desc: '10 задач выполнено' },
  { id: 'fifty_tasks',  emoji: '⚡', title: 'Машина',           desc: '50 задач выполнено' },
  { id: 'streak_3',     emoji: '🔥', title: 'В огне',           desc: 'Стрик 3 дня подряд' },
  { id: 'streak_7',     emoji: '🌟', title: 'Огненная неделя',  desc: 'Стрик 7 дней подряд' },
  { id: 'week_done',    emoji: '⭐', title: 'Недельный герой',  desc: 'Завершена неделя на 100%' },
  { id: 'phase_done',   emoji: '🏆', title: 'Фаза пройдена',   desc: 'Завершена целая фаза' },
  { id: 'all_done',     emoji: '💎', title: 'Основатель',       desc: 'Все 12 недель завершены' },
  { id: 'level_5',      emoji: '🎯', title: 'Тестировщик',     desc: 'Достигнут уровень 5' },
  { id: 'level_10',     emoji: '👑', title: 'Акселерат',       desc: 'Достигнут уровень 10' },
];

function getLevelInfo(totalXP) {
  let current = LEVELS[0];
  let next = LEVELS[1];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVELS[i].xpRequired) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || null;
      break;
    }
  }
  const xpInLevel = totalXP - current.xpRequired;
  const xpToNext = next ? next.xpRequired - current.xpRequired : 0;
  const progress = next ? Math.round((xpInLevel / xpToNext) * 100) : 100;
  return { current, next, xpInLevel, xpToNext, progress };
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

export function GameProvider({ children }) {
  const [totalXP, setTotalXP] = useLocalStorage('startup-roadmap-xp', 0);
  const [streak, setStreak] = useLocalStorage('startup-roadmap-streak', { current: 0, lastDate: null, max: 0 });
  const [unlockedAchievements, setUnlockedAchievements] = useLocalStorage('startup-roadmap-achievements', {});

  // Toast & level up state
  const [xpToast, setXpToast] = useState(null); // { id, amount }
  const [levelUpModal, setLevelUpModal] = useState(null); // { level, name }
  const [achievementToast, setAchievementToast] = useState(null); // achievement obj

  // Update streak on mount
  useEffect(() => {
    const today = getTodayStr();
    if (streak.lastDate === today) return; // already updated today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (streak.lastDate === yesterdayStr) {
      // consecutive day — don't increment yet, increment when task done
    } else if (streak.lastDate !== today) {
      // streak broken
      setStreak(prev => ({ ...prev, current: 0 }));
    }
  }, []); // eslint-disable-line

  const addXP = useCallback((amount, checkedCount) => {
    setTotalXP(prev => {
      const oldXP = prev;
      const newXP = Math.max(0, prev + amount);

      if (amount > 0) {
        // Check level up
        const oldLevel = getLevelInfo(oldXP).current.level;
        const newLevel = getLevelInfo(newXP).current.level;
        if (newLevel > oldLevel) {
          const lvlInfo = getLevelInfo(newXP);
          setLevelUpModal({ level: newLevel, name: lvlInfo.current.name });
        }

        // Show XP toast
        setXpToast({ id: Date.now(), amount });

        // Update streak
        const today = getTodayStr();
        setStreak(prev => {
          if (prev.lastDate === today) return prev; // already counted today
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          const newCurrent = prev.lastDate === yesterdayStr ? prev.current + 1 : 1;
          const newMax = Math.max(prev.max, newCurrent);
          return { current: newCurrent, lastDate: today, max: newMax };
        });

        // Check achievements
        if (checkedCount !== undefined) {
          checkAchievements({ totalXP: newXP, checkedCount, streak });
        }
      }

      return newXP;
    });
  }, [setTotalXP, setStreak, streak]); // eslint-disable-line

  const checkAchievements = useCallback(({ totalXP: xp, checkedCount, streak: s }) => {
    const toUnlock = [];

    if (checkedCount >= 1) toUnlock.push('first_task');
    if (checkedCount >= 10) toUnlock.push('ten_tasks');
    if (checkedCount >= 50) toUnlock.push('fifty_tasks');
    if (s?.current >= 3) toUnlock.push('streak_3');
    if (s?.current >= 7) toUnlock.push('streak_7');
    if (getLevelInfo(xp).current.level >= 5) toUnlock.push('level_5');
    if (getLevelInfo(xp).current.level >= 10) toUnlock.push('level_10');

    setUnlockedAchievements(prev => {
      let updated = { ...prev };
      let newOne = null;
      for (const id of toUnlock) {
        if (!prev[id]) {
          updated[id] = true;
          newOne = ACHIEVEMENTS.find(a => a.id === id);
        }
      }
      if (newOne) {
        setAchievementToast(newOne);
      }
      return updated;
    });
  }, [setUnlockedAchievements]);

  const unlockAchievement = useCallback((id) => {
    setUnlockedAchievements(prev => {
      if (prev[id]) return prev;
      const achievement = ACHIEVEMENTS.find(a => a.id === id);
      if (achievement) setAchievementToast(achievement);
      return { ...prev, [id]: true };
    });
  }, [setUnlockedAchievements]);

  const levelInfo = useMemo(() => getLevelInfo(totalXP), [totalXP]);

  const value = useMemo(() => ({
    totalXP,
    streak,
    levelInfo,
    unlockedAchievements,
    xpToast,
    levelUpModal,
    achievementToast,
    addXP,
    checkAchievements,
    unlockAchievement,
    clearXPToast: () => setXpToast(null),
    clearLevelUpModal: () => setLevelUpModal(null),
    clearAchievementToast: () => setAchievementToast(null),
  }), [totalXP, streak, levelInfo, unlockedAchievements, xpToast, levelUpModal, achievementToast, addXP, checkAchievements, unlockAchievement]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
