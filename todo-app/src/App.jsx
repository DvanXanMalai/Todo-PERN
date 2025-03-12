import { useEffect, useState } from 'react';
import Register from './components/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import { logout } from './auth.js';
import { getUserFromToken, isLoggedIn } from './auth.js';
import TodoList from './components/TodoListPage.jsx';

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userFromToken = getUserFromToken();
    setUser(userFromToken);
  }, []);
  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className='min-h-screen bg-base-100 flex flex-col items-center'>
        <h1 className='text-3xl font-body my-5'>Todo App</h1>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='todos'
            element={isLoggedIn() ? <TodoList user={user} /> : <Navigate to='/login' />}
          />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
