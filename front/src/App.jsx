import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Appointments from "./components/Appointments";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import AddAppointment from "./components/AddAppointment";
import NotFound from "./components/NotFound";
import EditAppointment from "./components/EditAppointment";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/add-appointment" element={<AddAppointment />} />
        <Route path="/appointments/edit/:id" element={<EditAppointment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
