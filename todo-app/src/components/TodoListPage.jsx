import { useState, useEffect } from 'react';
import api from '../api';
import TodoItem from './Todoitem';

const TodoList = (user) => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    console.log(user)

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await api.get('/todos');
            setTodos(response.data);
            console.log(response.data)
        };
        fetchTodos();
    }, []);

    const addTodo = async () => {
        try {
            const response = await api.post('/todos', { task });
            setTodos(prevTodos => [...(prevTodos || []), response.data]);
            console.log(todos)
            setTask('');
        } catch (error) {
            console.error('Error adding todo', error);
        }
    };
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='card bg-base-200 p-8 shadow-lg w-96'>
                <h2 className='text-2xl font-bold text-center mb-5'>{user.name}'s Todo List</h2>
                <div className='flex space-x-2'>
                    <input
                        className='input input-bordered flex-grow'
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder='New Task'
                    />
                    <button className='btn btn-sucess btn-primary ' onClick={addTodo}>
                        Add
                    </button>
                </div>
                {todos && todos.map((todo) => {
                    return todo && <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
                })}
            </div>
        </div>
    );
};
export default TodoList