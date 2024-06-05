import React, { useState } from 'react';
import useTasks from '../hooks/useTasks';
import { Task } from '../contexts/TaskContext';

const Modal: React.FC<{ date: Date; onClose: () => void }> = ({
  date,
  onClose,
}) => {
  const { tasks, addTask, removeTask, toggleTask } = useTasks();
  const [taskText, setTaskText] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false,
      date,
    };
    addTask(newTask);
    setTaskText('');
  };

  const handleSelectTask = (taskId: number) => {
    setSelectedTaskId(selectedTaskId === taskId ? null : taskId);
  };

  return (
    <>
      <div className='modal-overlay' onClick={onClose}></div>
      <div className='modal'>
        <h2>Tasks for {date.toDateString()}</h2>
        <ul>
          {tasks
            .filter((task) => task.date.getTime() === date.getTime())
            .map((task: Task) => (
              <li
                key={task.id}
                className={`task-item ${task.completed ? 'completed' : ''} ${
                  selectedTaskId === task.id ? 'selected' : ''
                }`}
                onClick={() => handleSelectTask(task.id)}
              >
                <span>{task.text}</span>
                {selectedTaskId === task.id && (
                  <>
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
                  </>
                )}
              </li>
            ))}
        </ul>
        <div className='task-input'>
          <input
            type='text'
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder='New task'
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <div className='modal-footer'>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default Modal;
