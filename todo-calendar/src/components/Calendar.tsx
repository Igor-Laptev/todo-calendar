import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import useTasks from '../hooks/useTasks';
import isDayOff from '../utils/isDayOff';

const Calendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(0); // Январь по умолчанию
  const [dayOffMap, setDayOffMap] = useState<{ [key: string]: boolean }>({});
  const { tasks } = useTasks();

  const year = 2024; // Используем 2024 год

  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  useEffect(() => {
    const fetchDayOffs = async () => {
      const numDays = daysInMonth(selectedMonth, year);
      const map: { [key: string]: boolean } = {};

      for (let i = 1; i <= numDays; i++) {
        const date = new Date(year, selectedMonth, i);
        const isOff = await isDayOff(date);
        map[date.toDateString()] = isOff;
      }

      setDayOffMap(map);
    };

    fetchDayOffs();
  }, [selectedMonth, year]);

  const renderDays = () => {
    const days = [];
    const numDays = daysInMonth(selectedMonth, year);
    const firstDay = new Date(year, selectedMonth, 1).getDay(); // День недели первого числа месяца

    // Добавляем пустые блоки для выравнивания первого дня месяца
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
      days.push(<div key={`empty-${i}`} className='day empty'></div>);
    }

    for (let i = 1; i <= numDays; i++) {
      const date = new Date(year, selectedMonth, i);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6; // 0 - Sunday, 6 - Saturday
      const isOff = dayOffMap[date.toDateString()] || isWeekend;
      const dayTasks = tasks.filter(
        (task) => task.date.getTime() === date.getTime()
      );
      const hasTask = dayTasks.length > 0;
      const completedTasksCount = dayTasks.filter(
        (task) => task.completed
      ).length;

      days.push(
        <div
          key={i}
          className={`day ${isOff ? 'day-off' : ''} ${
            hasTask ? 'task-day' : ''
          } ${
            completedTasksCount === dayTasks.length && dayTasks.length > 0
              ? 'completed-task-day'
              : ''
          }`}
          onClick={() => setSelectedDay(date)}
        >
          {i}
          <div className='tasks-count'>
            {dayTasks.length > 0 &&
              `${completedTasksCount} из ${dayTasks.length}`}
          </div>
        </div>
      );
    }
    return days;
  };

  const renderWeekdays = () => {
    const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    return weekdays.map((day) => (
      <div key={day} className='weekday'>
        {day}
      </div>
    ));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
  };

  return (
    <div className='calendar'>
      <select value={selectedMonth} onChange={handleMonthChange}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i}>
            {new Date(2024, i).toLocaleString('ru', { month: 'long' })}
          </option>
        ))}
      </select>
      {renderWeekdays()}
      {renderDays()}
      {selectedDay && (
        <Modal date={selectedDay} onClose={() => setSelectedDay(null)} />
      )}
    </div>
  );
};

export default Calendar;
