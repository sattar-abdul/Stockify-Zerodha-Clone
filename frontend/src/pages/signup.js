import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Signup() {
  const navigate = useNavigate();
  const auth = useAuth?.();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function validate() {
    if (!name.trim()) return "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirm) return "Passwords do not match";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Signup failed");
      }

      const data = await res.json();
      // prefer the backend to return { token, user }
      if (data.token) {
        // if an auth context with login() exists, reuse it to populate context
        if (auth?.login && typeof auth.login === "function") {
          // attempt to login via context to keep behaviour consistent
          try {
            await auth.login({ email, password });
          } catch {
            // fallback: set token directly
            localStorage.setItem("token", data.token);
          }
        } else {
          localStorage.setItem("token", data.token);
        }
      }

      // redirect to dashboard after signup
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: "48px auto", padding: 20 }}>
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
              style={{ width: "100%", padding: 10, marginTop: 6 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              required
              style={{ width: "100%", padding: 10, marginTop: 6 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 12, display: "grid", gap: 8 }}>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
            style={{ padding: 10 }}
          />
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm password"
            type="password"
            required
            style={{ padding: 10 }}
          />
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
