import { useState } from 'react';
import api from '../api';
import { saveToken } from '../auth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ name: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login', form);
            saveToken(response.data.token);
            navigate('/todos');
        } catch (error) {
            setError('Invalid name or password');
        }
    };
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='card bg-base-200 p-8 shadow-lg'>
                <h2 className='text-2xl font-bold text-center mb-5'>Login</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input
                        className='input input-bordered w-full'
                        name='name'
                        placeholder='name'
                        onChange={handleChange}
                    />
                    <input
                        className='input input-bordered w-full'
                        name='password'
                        placeholder='password'
                        type='password'
                        onChange={handleChange}
                    />
                    <button className='btn btn-primary w-full'>Login</button>
                </form>
                {error && <p className='text-red-500'>{error}</p>}
                <p className='text-center mt-3'>
                    Don't have an account?{' '}
                    <Link to='/register' className='text-blue-500 hover:underline'>
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
