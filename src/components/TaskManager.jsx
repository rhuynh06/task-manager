import { useState, useEffect } from "react";

// TaskManager Component
function TaskManager() {
    // Function to get the current date and time
    const getCurrentDateTime = () => {
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        return `${date} ${time}`;
    };

    // State hooks
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [task, setTask] = useState("");
    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
    const [darkMode, setDarkMode] = useState(() => {
        const savedDarkMode = localStorage.getItem("darkMode");
        return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    });
    const [editText, setEditText] = useState("");

    // useEffect hooks
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(getCurrentDateTime());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        document.body.classList.toggle("dark-theme", darkMode);
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    // Helper functions
    const addTask = () => {
        if (task.trim() !== "") {
            setTasks([...tasks, { text: task, completed: false, isEditing: false }]);
            setTask("");
        }
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const editTask = (index, newText) => {
        setTasks(tasks.map((task, i) => (i === index ? { ...task, text: newText, isEditing: false } : task)));
    };

    const toggleTask = (index) => {
        setTasks(tasks.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task)));
    };

    const startEditing = (index) => {
        setEditText(tasks[index].text);
        setTasks(tasks.map((task, i) => (i === index ? { ...task, isEditing: true } : task)));
    };

    const finishEditing = (index) => {
        if (editText.trim() === "") {
            removeTask(index);
        } else {
            editTask(index, editText);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            finishEditing(index);
        }
    };

    const handleAddTaskKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 100;

    // JSX return
    return (
        <div className="container">
            <h2>Task Manager</h2>
            <h5>Current Date and Time: {currentDateTime}</h5>
            <div className="theme-toggle">
                <input 
                    type="checkbox" 
                    id="themeSwitch" 
                    checked={darkMode} 
                    onChange={() => setDarkMode(!darkMode)} 
                />
                <label htmlFor="themeSwitch"></label>
            </div>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}>
                    {progress > 0 && <span className="progress-score">{progress}%</span>}
                </div>
            </div>
            <div>
                {tasks.map((task, index) => (
                    <div key={index} className={`task ${task.completed ? "completed" : ""}`}>
                        {task.isEditing ? (
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onBlur={() => finishEditing(index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                autoFocus
                            />
                        ) : (
                            <span onClick={() => startEditing(index)}>
                                {task.text}
                            </span>
                        )}
                        <button onClick={() => toggleTask(index)}>✔</button>
                        {task.completed && <button onClick={() => removeTask(index)}>✖</button>}
                    </div>
                ))}
            </div>
            <div className="add-task-container">
                <input
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new Task"
                    onKeyDown={handleAddTaskKeyDown}
                />
                <button onClick={addTask}>Add</button>
            </div>
        </div>
    )
}

export default TaskManager;