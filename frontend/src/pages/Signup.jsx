import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Signup() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function validate() {
    if (!name.trim()) return "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirm) return "Passwords do not match.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.message || "Signup failed");
      }

      // If backend returns token, use auth.setAuthToken to update context properly
      if (body.token) {
        if (auth?.setAuthToken) {
          await auth.setAuthToken(body.token);
          window.location.href = `http://localhost:3001?token=${body.token}`;
          return;
        } else {
          // fallback: call login (will set token) or persist token and reload
          await auth.login({ email, password }).catch(() => {
            localStorage.setItem("token", body.token);
          });
          window.location.href = `http://localhost:3001?token=${body.token}`;
          return;
        }
      }

      // If backend didn't return a token, try login
      if (auth?.login) {
        const { token } = await auth.login({ email, password });
        window.location.href = `http://localhost:3001?token=${token}`;
        return;
      }

      navigate("/login", { replace: true, state: { signupSuccess: true } });
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: "48px auto", padding: 20 }}>
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 14, marginBottom: 6 }}>
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ddd",
            }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 14, marginBottom: 6 }}>
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
            required
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ddd",
            }}
          />
        </div>

        <div style={{ marginBottom: 12, display: "grid", gap: 8 }}>
          <div>
            <label style={{ display: "block", fontSize: 14, marginBottom: 6 }}>
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ddd",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 14, marginBottom: 6 }}>
              Confirm password
            </label>
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm password"
              type="password"
              required
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ddd",
              }}
            />
          </div>
        </div>

        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 16px",
              background: "#387ED1",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating..." : "Create account"}
          </button>

          <Link to="/login" style={{ alignSelf: "center", marginLeft: 8 }}>
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
