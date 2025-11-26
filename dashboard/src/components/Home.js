import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { GeneralContextProvider } from "./GeneralContext";

const Home = () => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const urlToken = query.get("token");

    if (urlToken) {
      localStorage.setItem("token", urlToken);
      // Remove token from URL for cleaner look
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "http://localhost:3000/login";
    }
  }, []);

  return (
    <GeneralContextProvider>
      <TopBar />
      <Dashboard />
    </GeneralContextProvider>
  );
};

export default Home;
