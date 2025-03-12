import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import pool from './db.js';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js'

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/todos', todoRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
