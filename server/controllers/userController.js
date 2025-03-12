import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Helper funciton to generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

//User Signup
export const signup = async (req, res) => {
    const { name, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users(name,password) VALUES ($1,$2) RETURNING *'[(name, hashedPassword)]
        );
        const user = result.rows[0];
        const token = generateToken(user.id);
        res.status(201).json({
            id: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.error(err.message)
        res.status(500).json({ error: 'server error' })
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// Add a new user
export const addUser = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await pool.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};
