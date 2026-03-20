import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getWeekTaskIds, getPhaseTaskIds, getAllTaskIds } from '../data/roadmap';

const ProgressContext = createContext(null);

// taskDetail shape: { status: 'todo'|'in_progress'|'done'|'blocked', notes: '', links: [] }

export function ProgressProvider({ children }) {
  const [checkedItems, setCheckedItems] = useLocalStorage('startup-roadmap-progress', {});
  const [taskDetails, setTaskDetails] = useLocalStorage('startup-roadmap-details', {});

  const toggleTask = useCallback((taskId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  }, [setCheckedItems]);

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
    return { done, total: ids.length };
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
    resetAll,
    taskDetails,
    getTaskDetail,
    setTaskDetail,
    getTasksWithDetails,
  }), [checkedItems, toggleTask, isChecked, getWeekProgress, getPhaseProgress, getOverallProgress, resetAll, taskDetails, getTaskDetail, setTaskDetail, getTasksWithDetails]);

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
