import React from "react";
import { Route, Routes } from "react-router-dom";

import Holdings from "./Holdings";
import Summary from "./Summary";
import WatchList from "./WatchList";
import TopBar from "./TopBar";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <WatchList />
      <div className="content">
        <TopBar />
        <div className="dashboard-content">
          <Routes>
            <Route exact path="/" element={<Summary />} />
            <Route path="/holdings" element={<Holdings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
