import React, { useState } from 'react';
import { useTasks } from './Tasks';

const Modal: React.FC<{ date: Date; onClose: () => void }> = ({
  date,
  onClose,
}) => {
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
        <h2>Tasks for {date.toDateString()}</h2>
        <ul>
          {tasks
            .filter((task) => task.date === date)
            .map((task) => (
              <li key={task.id}>
                <input
                  type='checkbox'
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                {task.text}
                <button onClick={() => removeTask(task.id)}>Delete</button>
              </li>
            ))}
        </ul>
        <input
          type='text'
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder='New task'
        />
        <button onClick={handleAddTask}>Add Task</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
