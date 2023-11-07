import { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const initialTasks = [
  { id: 'task1', title: 'Task 1', priority: 'high' },
  { id: 'task2', title: 'Task 2', priority: 'medium' },
  { id: 'task3', title: 'Task 3', priority: 'low' },
];

const TaskTracker = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [searchTerm, setSearchTerm] = useState('');
    const [undoneTasks, setUndoneTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedTasks = [...tasks];
        const [movedTask] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, movedTask);

        setTasks(reorderedTasks);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const addTask = (title, priority) => {
        const newTask = { id: `task${tasks.length + 1}`, title, priority };
        setTasks([...tasks, newTask]);
    };

    const completeTask = (task) => {
        const updatedTasks = tasks.filter((t) => t.id !== task.id);
        setTasks(updatedTasks);
        setDoneTasks([...doneTasks, task]);
    };

    const undoTask = () => {
        if (undoneTasks.length === 0) return;
        const lastUndoneTask = undoneTasks.pop();
        setTasks([...tasks, lastUndoneTask]);
    };

    const redoTask = () => {
        if (doneTasks.length === 0) return;
        const lastDoneTask = doneTasks.pop();
        setTasks([...tasks, lastDoneTask]);
    };

    useEffect(() => {
        // Save tasks to local storage or database here
    }, [tasks]);

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-2xl font-bold">Task Tracker</h2>
            <input
                type="text"
                placeholder="Search tasks"
                value={searchTerm}
                onChange={handleSearch}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            />
            <button onClick={undoTask} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                Undo
            </button>
            <button onClick={redoTask} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                Redo
            </button>
            <ul>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {tasks
                                    .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`p-2 mb-2 rounded ${
                                                        task.priority === 'high' ? 'bg-red-200' : 
                                                        task.priority === 'medium' ? 'bg-yellow-200' : 'bg-green-200'
                                                    }`}
                                                >
                                                    {task.title}
                                                    <button onClick={() => completeTask(task)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                                                        Complete
                                                    </button>
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </ul>
            <div className="space-y-2">
                <h3 className="text-lg font-bold">Completed Tasks</h3>
                <ul>
                    {doneTasks.map((task) => (
                        <li key={task.id}>{task.title}</li>
                    ))}
                </ul>
            </div>
            <div className="space-y-2">
                <h3 className="text-lg font-bold">Undone Tasks</h3>
                <ul>
                    {undoneTasks.map((task) => (
                        <li key={task.id}>{task.title}</li>
                    ))}
                </ul>
            </div>
            <div className="space-y-2">
                <h3 className="text-lg font-bold">Add a Task</h3>
                <input
                    type="text"
                    placeholder="Task Title"
                    onChange={(e) => addTask(e.target.value, 'medium')}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                />
                <button onClick={addTask} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default TaskTracker;
