import React, { createContext, useState, ReactNode, useEffect } from 'react';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  date: Date;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  toggleTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const parseTasks = (tasks: any[]): Task[] => {
  return tasks.map((task) => ({
    ...task,
    date: new Date(task.date),
  }));
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? parseTasks(JSON.parse(savedTasks)) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const removeTask = (id: number) =>
    setTasks((prev) => prev.filter((task) => task.id !== id));
  const toggleTask = (id: number) =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
