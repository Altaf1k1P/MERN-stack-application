// filepath: d:\MERN stack application\client\src\components\TaskList.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from './Navbar';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const { data } = await api.get('/task');
            setTasks(data);
        };
        fetchTasks();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="task-list-container">
                <h2>Task Distribution</h2>
                <ul className="task-list">
                    {tasks.map((task) => (
                        <li key={task._id} className="task-item">
                            <div className="task-details">
                                <span className="task-name">{task.name}</span>
                                <span className="task-phone">{task.phone}</span>
                                <span className="task-notes">{task.note}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskList;