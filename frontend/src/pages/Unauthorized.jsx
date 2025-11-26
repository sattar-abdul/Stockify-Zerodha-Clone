import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div style={{ maxWidth: 720, margin: "48px auto", padding: 20 }}>
      <h2>Unauthorized</h2>
      <p>You do not have permission to view this page.</p>
      <Link to="/">Go to home</Link>
    </div>
  );
}
