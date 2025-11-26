import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const from = (location.state && location.state.from) || "/dashboard";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const { token } = await auth.login({ email, password });
      // Redirect to dashboard app on port 3001
      window.location.href = `http://localhost:3001?token=${token}`;
    } catch (err) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "48px auto", padding: 20 }}>
      <h2>Sign in</h2>
      {location.state?.signupSuccess && (
        <div style={{ color: "green" }}>
          Account created — signed in automatically if possible.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            style={{ width: "100%", padding: 10 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type="password"
            style={{ width: "100%", padding: 10 }}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="submit"
            style={{
              padding: "10px 16px",
              background: "#387ED1",
              color: "white",
              border: "none",
              borderRadius: 6,
            }}
          >
            Sign in
          </button>
          <Link to="/signup" style={{ alignSelf: "center", marginLeft: 8 }}>
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
}
