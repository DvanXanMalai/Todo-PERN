import { useState } from 'react'
import api from '../api'

const TodoItem = ({ todo, setTodos }) => {
    const [completed, setCompleted] = useState(todo.completed || false)
    const toggleComplete = async () => {
        try {
            await api.put(`/todos/${todo.id}`, { completed: !completed })
            setCompleted(!completed)
        } catch (error) {
            console.error("Error updating todo:", err)
        }
    }
    const deleteTodo = async () => {
        await api.delete(`/todos/${todo.id}`)
        setTodos((prev) => prev.filter((t) => t.id !== todo.id))
    }
    return (
        <li className="flex flex-col p-4 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 space-y-3 mt-2">
            <span className="text-lg text-gray-200">{todo.task}</span>
            <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-gray-300 bg-gray-700 border border-gray-600 rounded p-1">
                    {completed ? "Completed" : "Incomplete"}
                    <input
                        type="checkbox"
                        className="checkbox checkbox-sm checkbox-success mx-1"
                        checked={completed}
                        onChange={toggleComplete}
                    />
                </label>
                <button className="btn btn-sm btn-secondary" onClick={deleteTodo}>
                    Delete ❌
                </button>
            </div>
        </li>
    )
}
export default TodoItem