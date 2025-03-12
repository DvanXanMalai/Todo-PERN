import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//Helper funciton to generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

//User Signup
export const signUp = async (req, res) => {
    const { name, password } = req.body;
    try {
        const userCheckQuery = 'SELECT * FROM users WHERE name = $1';
        const userResult = await pool.query(userCheckQuery, [name]);

        if (userResult.rows.length > 0) {
            return res.status(400).json({ error: 'Acoount with this name already exists' });
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await pool.query(
            'INSERT INTO users(name,password) VALUES ($1,$2) RETURNING *',
            [name, hashedPassword]
        );
        const user = result.rows[0];
        const token = generateToken(user.id);
        res.status(201).json({
            id: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'server error' });
    }
};
//User Login
export const Login = async (req, res) => {
    const { name, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE name=$1', [name]);
        const user = result.rows[0];
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        const token = generateToken(user.id);
        res.json({
            id: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error logging in' });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT id,name FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// // Add a new user
// export const addUser = async (req, res) => {
//     try {
//         const { name } = req.body;
//         const result = await pool.query('INSERT INTO users (name,password) VALUES ($1) RETURNING *', [name]);
//         res.json(result.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ error: 'Server error' });
//     }
// };
