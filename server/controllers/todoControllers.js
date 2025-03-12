import pool from '../db.js';

//create a new todo
export const addTodo = async (req, res) => {
    const { task } = req.body;
    const userId = req.user.id;
    try {
        const result = await pool.query(
            'INSERT INTO todos(user_id,task) VALUES($1,$2) RETURNING *',
            [userId, task]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

//Get all todos for the authenticated user
export const getTodos = async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await pool.query('SELECT * FROM todos WHERE user_id=$1', [userId]);
        res.json(result.rows)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Server error" })
    }
};

//Update a todo's completion status
export const updateTodo = async (req, res) => {
    const { todoId } = req.params;
    const { completed } = req.body
    const userId = req.user.id
    try {
        const result = await pool.query('UPDATE todos SET completed =$1 WHERE id=$2 AND user_id=$3 RETURNING *', [completed, todoId, userId])
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Todo not found" })
        }
        res.json(result.rows[0])
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "server error" })

    }
}

//Delete a todo
export const deleteTodo = async (req, res) => {
    const { todoId } = req.params;
    const userId = req.user.id
    try {
        const result = await pool.query('DELETE FROM todos WHERE id=$1 AND user_id=$2 RETURNING *', [todoId, userId])
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Todo not found" })
        }
        res.json({ message: "Todo deleted" })

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Server error" })

    }

}