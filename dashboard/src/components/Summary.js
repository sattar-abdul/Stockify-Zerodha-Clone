import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const { user } = useContext(GeneralContext);

  return (
    <>
      <div className="section-title">Hi, {user?.name || "User"}!</div>
      <div className="divider" />

      <div className="summary-cards">
        <div className="card">
          <div className="card-header">Welcome to Your Dashboard</div>
          <div className="card-subtext" style={{ marginTop: "10px", lineHeight: "1.6" }}>
            <p>📈 View real-time stock prices on the left sidebar</p>
            <p style={{ marginTop: "8px" }}>💰 Click Buy or Sell to trade stocks (mock trading)</p>
            <p style={{ marginTop: "8px" }}>📊 Check "My Holdings" to see your purchased stocks</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
