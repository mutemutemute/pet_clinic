import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Appointments from './components/Appointments'
import SignupForm from './components/SignupForm'
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Appointments />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
