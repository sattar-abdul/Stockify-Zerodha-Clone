// Project structure notes & quick inspection commands:
//
// This project root (d:\Projects\Stockify - Zerodha clone) typically contains:
// - frontend/            -> React app (this file lives under frontend/src/...)
// - backend/             -> API server (if present)
// - README.md
// - package.json (root or per-folder)
// - .env or config files
//
// Common frontend layout (frontend/src):
// - src/config.js or config/         -> API_BASE and environment config
// - src/components/                  -> shared UI components
// - src/pages/ or src/views/         -> route pages (Dashboard, Login, etc.)
// - src/dashboard/                   -> dashboard-specific components (this folder)
// - src/assets/                       -> static assets
// - src/routes/ or App.js             -> route definitions
//
// Quick commands to inspect the repo (Windows PowerShell):
// - Get a tree of files:    tree /F "d:\Projects\Stockify - Zerodha clone"
// - List recursively:       ls -Recurse "d:\Projects\Stockify - Zerodha clone"
// - Open package.json:      code "d:\Projects\Stockify - Zerodha clone\package.json"
// - Check frontend package: code "d:\Projects\Stockify - Zerodha clone\frontend\package.json"
//
// To run locally (common patterns):
// - From root: cd "d:\Projects\Stockify - Zerodha clone" && npm install && npm run dev
// - Frontend only: cd frontend && npm install && npm start
//
// Use these to locate files referenced by this Dashboard (API_BASE -> src/config).

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE } from "../config";

export default function Dashboard() {
  const { userId: paramUserId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    let mounted = true;
    const fetchMe = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          // invalid token -> clear and redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        const payload = await res.json();
        const authUser = payload.user || payload; // handle different shapes
        if (!mounted) return;

        setUser(authUser);
        // Persist user for other parts of app
        localStorage.setItem("user", JSON.stringify(authUser));

        // Normalize route to /dashboard/:userId
        if (
          authUser &&
          paramUserId &&
          String(authUser.id) !== String(paramUserId)
        ) {
          navigate(`/dashboard/${authUser.id}`, { replace: true });
          return;
        }
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchMe();
    return () => {
      mounted = false;
    };
  }, [API_BASE, navigate, paramUserId, token]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Dashboard</h2>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>

      {user ? (
        <div>
          <p>
            Welcome, <strong>{user.name}</strong>
          </p>
          <p>Email: {user.email}</p>
          <p>
            Your dashboard URL: <code>/dashboard/{user.id}</code>
          </p>
          {/* ... extend dashboard UI here ... */}
        </div>
      ) : (
        <div>No user data</div>
      )}
    </div>
  );
}
