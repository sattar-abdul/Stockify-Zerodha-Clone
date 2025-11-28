import React from "react";
import { Link } from "react-router-dom";

const Funds = () => {
  return (
    <>
      <div className="funds" style={{ marginBottom: "20px" }}>
        <p>Instant, zero-cost fund transfers with UPI </p>
        <Link className="btn btn-green">Add funds</Link>
        <Link className="btn btn-blue">Withdraw</Link>
      </div>

      <div className="summary-cards">
        <div className="card">
          <div className="card-header">Equity</div>

          <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <p>Available margin</p>
            <p className="imp colored" style={{ fontSize: '1.5rem', color: '#4361ee' }}>4,043.10</p>
          </div>
          <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <p>Used margin</p>
            <p className="imp" style={{ fontSize: '1.5rem' }}>3,757.30</p>
          </div>
          <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <p>Available cash</p>
            <p className="imp" style={{ fontSize: '1.5rem' }}>4,043.10</p>
          </div>
          <hr className="divider" />
          <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <p>Opening Balance</p>
            <p>4,043.10</p>
          </div>
          <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <p>Opening Balance</p>
            <p>3736.40</p>
          </div>
          <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <p>Payin</p>
            <p>4064.00</p>
          </div>
          <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <p>SPAN</p>
            <p>0.00</p>
          </div>
          <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <p>Delivery margin</p>
            <p>0.00</p>
          </div>
          <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <p>Exposure</p>
            <p>0.00</p>
          </div>
          <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <p>Options premium</p>
            <p>0.00</p>
          </div>
          <hr className="divider" />
          <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <p>Collateral (Liquid funds)</p>
            <p>0.00</p>
          </div>
          <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <p>Collateral (Equity)</p>
            <p>0.00</p>
          </div>
          <div className="data-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <p>Total Collateral</p>
            <p>0.00</p>
          </div>
        </div>

        <div className="card">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
