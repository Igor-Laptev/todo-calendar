import React from 'react';

const Calendar: React.FC = () => {
  const daysInMonth = (month: number, year: number) =>
    new Date(year, month, 0).getDate();

  const renderDays = () => {
    const days = [];
    const today = new Date();
    const numDays = daysInMonth(today.getMonth() + 1, today.getFullYear());

    for (let i = 1; i <= numDays; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i);
      days.push(
        <div key={i} className={`day ${date.getDay() === 0 ? 'day-off' : ''}`}>
          {i}
        </div>
      );
    }
    return days;
  };

  return <div className='calendar'>{renderDays()}</div>;
};

export default Calendar;
