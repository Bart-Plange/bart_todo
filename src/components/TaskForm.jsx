// TaskForm.jsx
import { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState('');
  const [tasksList, setTasksList] = useState([]);

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasksList([...tasksList, task]);
      setTask('');
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasksList];
    updatedTasks.splice(index, 1);
    setTasksList(updatedTasks);
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md w-full md:w-2/3">
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Add a task..."
          className="w-3/4 py-2 px-3 border rounded-md shadow-md focus:outline-none focus:ring focus:border-blue-300"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-400"
        >
          Add Task
        </button>
      </div>

      {tasksList.length > 0 && (
        <ul>
          {tasksList.map((task, index) => (
            <li key={index} className="mb-2">
              {task}
              <button
                onClick={() => handleRemoveTask(index)}
                className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskForm;
