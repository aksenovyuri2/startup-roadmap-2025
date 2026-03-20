import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getWeekTaskIds, getPhaseTaskIds, getAllTaskIds } from '../data/roadmap';

const ProgressContext = createContext(null);

function getTodayKey() {
  return `startup-daily-${new Date().toISOString().split('T')[0]}`;
}

// taskDetail shape: { status: 'todo'|'in_progress'|'done'|'blocked', notes: '', links: [] }

export function ProgressProvider({ children }) {
  const [checkedItems, setCheckedItems] = useLocalStorage('startup-roadmap-progress', {});
  const [taskDetails, setTaskDetails] = useLocalStorage('startup-roadmap-details', {});
  const [dailyCounts, setDailyCounts] = useLocalStorage('startup-daily-counts', {});

  const toggleTask = useCallback((taskId) => {
    setCheckedItems((prev) => {
      const wasChecked = !!prev[taskId];
      // Update daily count
      const key = getTodayKey();
      setDailyCounts((dc) => ({
        ...dc,
        [key]: Math.max(0, (dc[key] || 0) + (wasChecked ? -1 : 1)),
      }));
      return { ...prev, [taskId]: !wasChecked };
    });
  }, [setCheckedItems, setDailyCounts]);

  const getTodayCount = useCallback(() => {
    return dailyCounts[getTodayKey()] || 0;
  }, [dailyCounts]);

  const isChecked = useCallback((taskId) => {
    return !!checkedItems[taskId];
  }, [checkedItems]);

  const getWeekProgress = useCallback((weekId) => {
    const ids = getWeekTaskIds(weekId);
    const done = ids.filter((id) => checkedItems[id]).length;
    return { done, total: ids.length };
  }, [checkedItems]);

  const getPhaseProgress = useCallback((phaseId) => {
    const ids = getPhaseTaskIds(phaseId);
    const done = ids.filter((id) => checkedItems[id]).length;
    return { done, total: ids.length };
  }, [checkedItems]);

  const getOverallProgress = useCallback(() => {
    const ids = getAllTaskIds();
    const done = ids.filter((id) => checkedItems[id]).length;
    const total = ids.length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { done, total, percent };
  }, [checkedItems]);

  const resetAll = useCallback(() => {
    setCheckedItems({});
    setTaskDetails({});
  }, [setCheckedItems, setTaskDetails]);

  const getTaskDetail = useCallback((taskId) => {
    return taskDetails[taskId] || { status: 'todo', notes: '', links: [] };
  }, [taskDetails]);

  const setTaskDetail = useCallback((taskId, updates) => {
    setTaskDetails((prev) => ({
      ...prev,
      [taskId]: { ...(prev[taskId] || { status: 'todo', notes: '', links: [] }), ...updates },
    }));
  }, [setTaskDetails]);

  const getTasksWithDetails = useCallback(() => {
    return taskDetails;
  }, [taskDetails]);

  const value = useMemo(() => ({
    checkedItems,
    toggleTask,
    isChecked,
    getWeekProgress,
    getPhaseProgress,
    getOverallProgress,
    getTodayCount,
    resetAll,
    taskDetails,
    getTaskDetail,
    setTaskDetail,
    getTasksWithDetails,
  }), [checkedItems, toggleTask, isChecked, getWeekProgress, getPhaseProgress, getOverallProgress, getTodayCount, resetAll, taskDetails, getTaskDetail, setTaskDetail, getTasksWithDetails]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used within ProgressProvider');
  return context;
}
