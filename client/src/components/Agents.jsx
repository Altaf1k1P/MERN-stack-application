import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from './Navbar';

const Agents = () => {
    const [agents, setAgents] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

    useEffect(() => {
        const fetchAgents = async () => {
            const { data } = await api.get('/find');
            setAgents(data);
        };
        fetchAgents();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addAgent = async (e) => {
        e.preventDefault();
        await api.post('/add-agent', form);
        alert('Agent Added');
        window.location.reload();
    };

    return (
        <div>
            <Navbar />
            <h2>Agents</h2>
            <form onSubmit={addAgent}>
                <input name="name" placeholder="Name" onChange={handleChange} required />
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <input name="phone" placeholder="Mobile" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Add Agent</button>
            </form>
            
            <h3>Agent List:</h3>
            <ul>
                {agents.map((agent) => (
                    <li key={agent._id}>{agent.name} - {agent.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default Agents;
