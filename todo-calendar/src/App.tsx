import React from 'react';
import Calendar from './components/Calendar';
import WeeklyTasks from './components/WeeklyTasks';
import { TaskProvider } from './contexts/TaskContext';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className='app'>
        <h1>To-do Calendar</h1>
        <Calendar />
        <WeeklyTasks />
      </div>
    </TaskProvider>
  );
};

export default App;
