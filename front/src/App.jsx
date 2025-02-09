import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Appointments from './components/Appointments'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
