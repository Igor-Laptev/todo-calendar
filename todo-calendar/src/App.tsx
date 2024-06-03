import React from 'react';
import Calendar from './components/Calendar';

const App: React.FC = () => {
  return (
    <div className='app'>
      <h1>To-do Calendar</h1>
      <Calendar />
    </div>
  );
};

export default App;
