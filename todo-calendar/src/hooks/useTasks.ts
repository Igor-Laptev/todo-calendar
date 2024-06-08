import { useContext } from 'react';
import TaskContext, { TaskContextType } from '../contexts/TaskContext';

const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export default useTasks;
