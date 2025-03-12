import { useState } from 'react'
import Register from './components/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
