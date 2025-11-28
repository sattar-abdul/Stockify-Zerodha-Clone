import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { getBulkStockPrices, toFinnhubSymbol } from "../services/stockService";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHoldings = async () => {
      setLoading(true);
      try {
        // Fetch holdings from backend
        const res = await axios.get("/allHoldings");
        const holdings = res.data;

        // Fetch real-time prices
        const symbols = holdings.map(stock => toFinnhubSymbol(stock.name));
        const prices = await getBulkStockPrices(symbols);

        // Update holdings with real-time prices
        const updatedHoldings = holdings.map(stock => {
          const symbol = toFinnhubSymbol(stock.name);
          const newPrice = prices[symbol];

          if (newPrice && newPrice > 0) {
            const oldPrice = stock.price;
            const dayChange = ((newPrice - oldPrice) / oldPrice) * 100;

            return {
              ...stock,
              price: newPrice,
              day: `${dayChange >= 0 ? '+' : ''}${dayChange.toFixed(2)}%`,
              isLoss: dayChange < 0
            };
          }

          return stock;
        });

        setAllHoldings(updatedHoldings);
      } catch (error) {
        console.error('Error fetching holdings:', error);
        // Fallback to static data if fetch fails
        const res = await axios.get("/allHoldings");
        setAllHoldings(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();

    // Refresh every 30 seconds
    const interval = setInterval(fetchHoldings, 30000);

    return () => clearInterval(interval);
  }, []);

  // Calculate totals dynamically
  const totalInvestment = allHoldings.reduce((sum, stock) => sum + (stock.avg * stock.qty), 0);
  const currentValue = allHoldings.reduce((sum, stock) => sum + (stock.price * stock.qty), 0);
  const totalPnL = currentValue - totalInvestment;
  const pnlPercentage = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Stock Price',
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: 'rgba(67, 97, 238, 0.5)', // Primary
      },
    ],
  };

  return (
    <>
      <h3 className="section-title">
        My Holdings ({allHoldings.length})
        {loading && <span style={{ fontSize: '14px', color: '#999', marginLeft: '10px' }}>(updating...)</span>}
      </h3>

      {allHoldings.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: 'var(--text-muted)' }}>No holdings yet. Start buying stocks from the dashboard!</p>
        </div>
      ) : (
        <>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Avg. cost</th>
                  <th>LTP</th>
                  <th>Cur. val</th>
                  <th>P&L</th>
                  <th>Net chg.</th>
                  <th>Day chg.</th>
                </tr>
              </thead>
              <tbody>
                {allHoldings.map((stock, index) => {
                  const currValue = stock.price * stock.qty;
                  const pnl = currValue - stock.avg * stock.qty;
                  const isProfit = pnl >= 0.0;
                  const profitClass = isProfit ? "profit" : "loss";
                  const dayClass = stock.isLoss ? "loss" : "profit";

                  return (
                    <tr key={index}>
                      <td>{stock.name}</td>
                      <td>{stock.qty}</td>
                      <td>₹{stock.avg.toFixed(2)}</td>
                      <td>₹{stock.price.toFixed(2)}</td>
                      <td>₹{currValue.toFixed(2)}</td>
                      <td className={profitClass}>
                        ₹{pnl.toFixed(2)}
                      </td>
                      <td className={profitClass}>{stock.net || '-'}</td>
                      <td className={dayClass}>{stock.day || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="summary-cards" style={{ marginTop: "24px" }}>
            <div className="card">
              <div className="card-header">Total Investment</div>
              <div className="card-value">
                ₹{totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="card">
              <div className="card-header">Current Value</div>
              <div className="card-value">
                ₹{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="card">
              <div className="card-header">P&L</div>
              <div className={`card-value ${totalPnL >= 0 ? 'profit' : 'loss'}`}>
                ₹{totalPnL.toFixed(2)} ({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(2)}%)
              </div>
            </div>
          </div>

          <div style={{ marginTop: "40px" }}>
            <VerticalGraph data={data} />
          </div>
        </>
      )}
    </>
  );
};

export default Holdings;
