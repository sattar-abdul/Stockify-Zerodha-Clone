import React, { useEffect } from "react";
import { FRONTEND_URL } from "../config";
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
      window.location.href = `${FRONTEND_URL}/login`;
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
