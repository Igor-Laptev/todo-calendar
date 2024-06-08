import React from 'react';
import useTasks from '../hooks/useTasks';
import { Task } from '../contexts/TaskContext';

const getWeekNumber = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};

const WeeklyTasks: React.FC = () => {
  const { tasks, toggleTask } = useTasks();

  const tasksByWeek = tasks.reduce(
    (acc: { [key: number]: Task[] }, task: Task) => {
      const weekNumber = getWeekNumber(task.date);
      if (!acc[weekNumber]) {
        acc[weekNumber] = [];
      }
      acc[weekNumber].push(task);
      return acc;
    },
    {}
  );

  return (
    <div className='weekly-tasks'>
      {Object.keys(tasksByWeek).map((weekNumber) => (
        <div key={weekNumber} className='week'>
          <h3>Неделя {weekNumber}</h3>
          <ul>
            {tasksByWeek[parseInt(weekNumber, 10)].map((task: Task) => (
              <li
                key={task.id}
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <span>{task.text}</span>
                <span>{task.date.toLocaleDateString()}</span>
                <input
                  type='checkbox'
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WeeklyTasks;
