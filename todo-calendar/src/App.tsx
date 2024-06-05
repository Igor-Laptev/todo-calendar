import React from 'react';
import Calendar from './components/Calendar';
import { TaskProvider } from './contexts/TaskContext';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className='app'>
        <h1>To-do Calendar</h1>
        <Calendar />
      </div>
    </TaskProvider>
  );
};

export default App;
