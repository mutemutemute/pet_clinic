import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContextProvider from "./contexts/UserContextProvider.jsx";
import AppointmentContextProvider from "./contexts/AppointmentContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <AppointmentContextProvider>
        <App />
      </AppointmentContextProvider>
    </UserContextProvider>
  </StrictMode>
);
