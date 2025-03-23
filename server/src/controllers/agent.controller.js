import bcrypt from "bcrypt"
import { Agent } from '../modles/Agent.model.js';
const addAgent = async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name ||!email ||!password || !phone) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (await Agent.findOne({ email })) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
        return res.status(500).json({ message: 'Error hashing password' });
    }
    const agent = new Agent({ name,  email, password: hashedPassword, phone });


    await agent.save();
    if (!agent) {
        return res.status(500).json({ message: 'Error saving agent' });
    }
    res.status(201).json({agent, message: 'agent added' });
};

const findAgent = async (req, res) => {
    const agents = await Agent.find();
    res.json(agents);
};

export { addAgent, findAgent };