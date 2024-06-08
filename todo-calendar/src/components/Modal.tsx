import React, { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import useTasks from '../hooks/useTasks';

interface ModalProps {
  date: Date;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ date, onClose }) => {
  const { tasks, addTask, removeTask, toggleTask } = useTasks();
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    const newTask = { id: Date.now(), text: taskText, completed: false, date };
    addTask(newTask);
    setTaskText('');
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Задачи на {format(date, 'EEEE, d MMMM yyyy', { locale: ru })}</h2>
        <ul>
          {tasks
            .filter((task) => task.date.getTime() === date.getTime())
            .map((task) => (
              <li
                key={task.id}
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <span>{task.text}</span>
                <div>
                  <button
                    className='button-completed'
                    onClick={() => toggleTask(task.id)}
                  >
                    Выполнено
                  </button>
                  <button
                    className='button-delete'
                    onClick={() => removeTask(task.id)}
                  >
                    Удалить
                  </button>
                </div>
              </li>
            ))}
        </ul>
        <div className='task-input'>
          <input
            type='text'
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder='Новая задача'
          />
          <button onClick={handleAddTask}>Добавить</button>
        </div>
        <div className='modal-footer'>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
