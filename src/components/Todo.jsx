import { useState, useEffect } from 'react';
import ColorPalette from './ColorPalette';
import Category from './Category';

function ToDo() {
  const [categories, setCategories] = useState(['work', 'school', 'offices']);
  const handleCreateCategory = (categoryName) => {
    if (categoryName.trim() !== '') {
      setCategories([...categories, categoryName]);
    }
  };

  const handleCategoryDelete = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Task 1',
      completed: false,
      date: '2023-10-16',
      time: '10:00 AM',
      details: 'Task details go here.',
      category: 'work',
    },
    {
      id: 2,
      text: 'Task 2',
      completed: false,
      date: '2023-10-17',
      time: '2:30 PM',
      details: 'Another task with details.',
      category: 'school',
    },
    {
      id: 3,
      text: 'Task 3',
      completed: true,
      date: '2023-10-18',
      time: '4:45 PM',
      details: 'This is a completed task with extra details.',
      category: 'work',
    },
  ]);

  const [selectedColor, setSelectedColor] = useState(null);

  const [completedTasks, setCompletedTasks] = useState([]);
  const [removedTasks, setRemovedTasks] = useState([]);

  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newDetails, setNewDetails] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const [errorMessages, setErrorMessages] = useState({
    task: '',
    date: '',
    time: '',
    category: '',
  });

  const [editedTask, setEditedTask] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const addTask = () => {
    const errors = {};

    if (newTask.trim() === '') {
      errors.task = 'Task is required';
    }

    if (newDate === '') {
      errors.date = 'Date is required';
    }

    if (newTime === '') {
      errors.time = 'Time is required';
    }
    
    if (selectedCategory.trim() === '') {
      errors.category = 'Category is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: prevTasks.length + 1,
        text: newTask,
        completed: false,
        date: newDate,
        time: newTime,
        details: newDetails,
        color: selectedColor,
        category: selectedCategory,
      },
    ]);
    setNewTask('');
    setNewDate('');
    setNewTime('');
    setNewDetails('');
    setSelectedCategory('');
    setErrorMessages({});
  };

  const selectColor = (color) => {
    setSelectedColor(color);
    if (editedTask) {
      setEditedTask({ ...editedTask, color });
    }
  };

  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setRemovedTasks((prevRemovedTasks) => [...prevRemovedTasks, taskToDelete]);
  };

  const completeTask = (taskId) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, taskToComplete]);
  };

  const openPopup = (task) => {
    setSelectedTask(task);
    setEditedTask(null);
  };

  const closePopup = () => {
    setSelectedTask(null);
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditedTask({ ...taskToEdit });
  };

  const saveEditedTask = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editedTask.id ? { ...task, ...editedTask } : task))
    );
    setEditedTask(null);
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  const categoryMessage = selectedCategory
    ? `Tasks according to category: ${selectedCategory}`
    : 'All Tasks';

  // reminder functions
   const toggleReminder = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, reminderEnabled: !task.reminderEnabled }
          : task
      )
    );
  };

  const formatTime = (time) => {
    // You can format the time here as needed, e.g., AM/PM to 24-hour format
    return time;
  };

  const scheduleReminder = (task) => {
  if (task.reminderEnabled) {
    const reminderTime = new Date(`${task.date}T${task.time}`);
    const currentTime = new Date();

    if (reminderTime > currentTime) {
      // Calculate the time differences (in milliseconds) for each reminder
      const timeUntilReminder3Hours = reminderTime - new Date(currentTime - 3 * 60 * 60 * 1000);
      const timeUntilReminder1Hour = reminderTime - new Date(currentTime - 1 * 60 * 60 * 1000);
      const timeUntilReminder30Minutes = reminderTime - new Date(currentTime - 30 * 60 * 1000);
      const timeUntilReminder5Minutes = reminderTime - new Date(currentTime - 5 * 60 * 1000);

      // Helper function to create and schedule a notification
      const scheduleNotification = (message, delay) => {
        setTimeout(() => {
          if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification(`Reminder: ${task.text}`, {
              body: message,
            });

            // Close the notification after a few seconds
            setTimeout(() => {
              notification.close();
            }, 5000);
          }
        }, delay);
      };

      // Schedule notifications at different intervals
      scheduleNotification(`3 hours until your task: ${formatTime(task.time)}`, timeUntilReminder3Hours);
      scheduleNotification(`1 hour until your task: ${formatTime(task.time)}`, timeUntilReminder1Hour);
      scheduleNotification(`30 minutes until your task: ${formatTime(task.time)}`, timeUntilReminder30Minutes);
      scheduleNotification(`5 minutes until your task: ${formatTime(task.time)}`, timeUntilReminder5Minutes);

      // Completion notification when the task's time arrives
      setTimeout(() => {
        if ('Notification' in window && Notification.permission === 'granted') {
          const notification = new Notification(`Task Completed: ${task.text}`, {
            body: `It's time for your task!`,
          });

          // Close the notification after a few seconds
          setTimeout(() => {
            notification.close();
          }, 5000);
        }
      }, reminderTime - currentTime);
    }
  }
};

  // Schedule reminders for existing tasks
useEffect(() => {
  tasks.forEach((task) => {
    scheduleReminder(task);
  });
}, [tasks]);



  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar - Category Component */}
      <div className="w-1/4 bg-gray-200">
        <Category
          categories={categories}
          onCreateCategory={handleCreateCategory}
          onCategoryDelete={handleCategoryDelete}
          onCategorySelect={(category) => setSelectedCategory(category)}
        />
      </div>
      {/* Main Content - Task List */}
      <div className="w-2/4 p-4">
        <h1 className="text-2xl lg:text-4xl text-gray-400 font-bold mb-4">To-Do List</h1>
        {/* Error Messages */}
        {errorMessages.task && <p className="text-red-500">{errorMessages.task}</p>}
        {errorMessages.date && <p className="text-red-500">{errorMessages.date}</p>}
        {errorMessages.time && <p className="text-red-500">{errorMessages.time}</p>}
        {errorMessages.category && <p className="text-red-500">{errorMessages.category}</p>}
        {/* Category Message */}
        <p>{categoryMessage}</p>
        <ul className="space-y-2 mt-4 w-1/3 flex justify-between gap-8 ">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`flex flex-col items-center justify-between px-4 py-2 flex-shrink ${
                task.completed ? 'bg-green-100 text-green-700' : 'bg-white text-gray-800'
              }`}
              onClick={() => openPopup(task)}
              style={{ backgroundColor: task.color }}
            >
              <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
              <div className='flex gap-4 pt-1'>
                <button className="text-green-600 bg-green-300 rounded-full" title="Complete" onClick={() => completeTask(task.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button className="text-red-600 bg-red-300 rounded-full" title="Delete" onClick={() => deleteTask(task.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* reminders */}
                <label>
                  Set Reminder:
                  <input
                    type="checkbox"
                    checked={task.reminderEnabled}
                    onChange={() => toggleReminder(task.id)}
                  />
                </label>
              </div>
            </li>
          ))}
        </ul>
        {/* Add Task Form */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-orange-400"
          />
          {errorMessages.task && <p className="text-red-500">{errorMessages.task}</p>}
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full mt-2 p-2 rounded border border-gray-300 focus:outline-none focus:border-orange-400"
          />
          {errorMessages.date && <p className="text-red-500">{errorMessages.date}</p>}
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="w-full mt-2 p-2 rounded border border-gray-300 focus:outline-none focus:border-orange-400"
          />
          {errorMessages.time && <p className="text-red-500">{errorMessages.time}</p>}
          <textarea
            rows="3"
            placeholder="Add details (optional)"
            value={newDetails}
            onChange={(e) => setNewDetails(e.target.value)}
            className="w-full mt-2 p-2 rounded border border-gray-300 focus:outline-none focus:border-orange-400"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full mt-2 p-2 rounded border border-gray-300 focus:outline-none focus:border-orange-400 hover:border-orange-500 hover:bg-orange-100 transition"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {/* Color Palette */}
          <div className="color-palette-container">
            <ColorPalette selectedColor={selectedColor} onColorSelect={selectColor} />
          </div>
          <button
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-400"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        {/* Task Details Popup */}
        {selectedTask && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
            <div className="bg-blue-900 h-42 p-4 rounded shadow-md text-white">
              {editedTask ? (
                <div>
                  {/* Edit Task Form */}
                  <div>
                    <input
                      type="text"
                      value={editedTask.text}
                      onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
                      className="border border-orange-300 p-2 rounded bg-transparent"
                    />
                    <input
                      type="date"
                      value={editedTask.date}
                      onChange={(e) => setEditedTask({ ...editedTask, date: e.target.value })}
                      className="border border-orange-300 ml-2 p-2 rounded bg-transparent"
                    />
                    <input
                      type="time"
                      value={editedTask.time}
                      onChange={(e) => setEditedTask({ ...editedTask, time: e.target.value })}
                      className="ml-2 border border-orange-300 p-2 rounded bg-transparent"
                    />
                    <select
                      value={editedTask.category}
                      onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
                      className="border border-orange-300 mt-2 w-full bg-transparent p-2 rounded"
                    >
                      <option value="" className='bg-blue-700'>Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category} className='bg-blue-700 hover:bg-orange-500'>
                          {category}
                        </option>
                      ))}
                    </select>
                    <textarea
                      rows="3"
                      value={editedTask.details}
                      onChange={(e) => setEditedTask({ ...editedTask, details: e.target.value })}
                      className="border border-orange-500 mt-2 w-full bg-transparent p-2"
                    />
                    <button
                      onClick={saveEditedTask}
                      className="border border-gray-500 rounded p-1 transition hover:bg-blue-600"
                    >
                      Save
                    </button>
                    {/* Color Palette */}
                    <div className="color-palette-container mt-4">
                      <ColorPalette selectedColor={selectedColor} onColorSelect={selectColor} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex">
                  <div>
                    <h2 className="text-2xl font-semibold underline">{selectedTask.text}</h2>
                    <p className="text-sm text-gray-400 py-2">
                      Date: {selectedTask.date} Time: {selectedTask.time}
                    </p>
                    <p className="mt-2">{selectedTask.details}</p>
                  </div>
                  <div className="flex flex-col ml-12">
                    <button
                      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover-bg-blue-600"
                      onClick={closePopup}
                    >
                      Close
                    </button>
                    <button
                      className="mt-4 text-white py-2 px-4 border border-gray-900 hover-bg-blue-600 hover:bg-blue-600 transition"
                      onClick={() => editTask(selectedTask.id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Categories and Tasks List */}
        <div className="mt-8 bg-orange-600 px-4 py-4">
          <h2 className="text-xl font-bold text-white underline pb-3">Categories and Tasks</h2>
          <ul className="flex justify-between">
            {categories.map((category) => (
              <li key={category}>
                <h3 className="text-lg font-semibold">{category}</h3>
                <ul>
                  {tasks
                    .filter((task) => task.category === category)
                    .map((task) => (
                      <li key={task.id} className='text-gray-200'>
                        {task.text}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        {/* Completed and Removed Task History */}
        <div className='flex justify-between'>
        <div className="mt-8">
          <h2 className="text-xl font-bold">Completed Tasks</h2>
          <ul className="space-y-2">
            {completedTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between px-4 py-2 bg-green-100 text-green-700"
              >
                <span className="line-through">{task.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold">Removed Tasks</h2>
          <ul className="space-y-2">
            {removedTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between px-4 py-2 bg-red-100 text-red-700"
              >
                <span>{task.text}</span>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ToDo;
