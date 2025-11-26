import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(token);

  // fetch profile when token changes
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setUser(data.user || data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        if (!cancelled) {
          setToken(null);
          setUser(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  async function login({ email, password }) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Login failed");
    }

    const body = await res.json();
    const t = body.token;
    const u = body.user;

    if (t) {
      // central token setter
      await setAuthToken(t);
    } else {
      if (u) setUser(u);
    }
    return { user: u, token: t };
  }

  // central method to set / clear token and fetch profile
  async function setAuthToken(t) {
    if (!t) {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      return;
    }

    localStorage.setItem("token", t);
    setToken(t);

    // immediately fetch user (so consumers don't need to wait for useEffect)
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (!res.ok) throw new Error("Invalid token");
      const data = await res.json();
      setUser(data.user || data);
    } catch (err) {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout,
        setAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
