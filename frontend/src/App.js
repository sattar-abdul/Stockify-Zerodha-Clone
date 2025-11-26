import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./landing_page/signup/Signup";
import Login from "./landing_page/login/Login";
import Dashboard from "./dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      {/* ...existing layout/header... */}
      <Routes>
        {/* ...existing routes... */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        {/* ...existing routes... */}
      </Routes>
      {/* ...existing footer... */}
    </BrowserRouter>
  );
}

export default App;
