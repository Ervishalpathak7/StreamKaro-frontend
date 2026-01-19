import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home";
import RegisterPage from "@/pages/register";
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
