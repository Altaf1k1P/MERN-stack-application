import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import {User} from "../modles/User.model.js"
const register = async (req, res) => {
    const { firstName, lastName, email, password, role} = req.body;
    if (!firstName ||!lastName ||!email ||!password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
        return res.status(500).json({ message: 'Error hashing password' });
    }
    const user = new User({ firstName, lastName, email, password: hashedPassword, role });


    await user.save();
    if (!user) {
        return res.status(500).json({ message: 'Error saving user' });
    }
    res.status(201).json({ message: 'User registered' });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

export { register, login };