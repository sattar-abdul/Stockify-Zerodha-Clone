import React, { useState, useContext, useEffect } from "react";
import { Tooltip, Grow } from "@mui/material";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  BarChartOutlined,
  MoreHoriz,
} from "@mui/icons-material";
import { watchlist } from "../data/data";
import GeneralContext from "./GeneralContext";
import { DoughnutChart } from "./DoughnutChart";
import { getBulkStockPrices, toFinnhubSymbol } from "../services/stockService";

const labels = watchlist.map((subArray) => subArray["name"]);

const WatchList = () => {
  const [stocks, setStocks] = useState(watchlist);
  const [loading, setLoading] = useState(false);

  // Fetch real-time prices
  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      try {
        const symbols = watchlist.map(stock => toFinnhubSymbol(stock.name));
        const prices = await getBulkStockPrices(symbols);

        // Update stocks with real prices
        const updatedStocks = watchlist.map(stock => {
          const symbol = toFinnhubSymbol(stock.name);
          const newPrice = prices[symbol];

          if (newPrice && newPrice > 0) {
            const oldPrice = stock.price;
            const change = ((newPrice - oldPrice) / oldPrice) * 100;

            return {
              ...stock,
              price: newPrice.toFixed(2),
              percent: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
              isDown: change < 0
            };
          }

          return stock;
        });

        setStocks(updatedStocks);
      } catch (error) {
        console.error('Error fetching stock prices:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch immediately
    fetchPrices();

    // Refresh every 30 seconds
    const interval = setInterval(fetchPrices, 30000);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: stocks.map((stock) => stock.price),
        backgroundColor: [
          "rgba(67, 97, 238, 0.5)", // Primary
          "rgba(0, 184, 148, 0.5)", // Success
          "rgba(255, 118, 117, 0.5)", // Danger
          "rgba(253, 203, 110, 0.5)", // Warning
          "rgba(116, 185, 255, 0.5)", // Info
          "rgba(63, 55, 201, 0.5)", // Secondary
        ],
        borderColor: [
          "rgba(67, 97, 238, 1)",
          "rgba(0, 184, 148, 1)",
          "rgba(255, 118, 117, 1)",
          "rgba(253, 203, 110, 1)",
          "rgba(116, 185, 255, 1)",
          "rgba(63, 55, 201, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts">
          {stocks.length} / 50 {loading && <span style={{ fontSize: '12px', color: '#999' }}>(updating...)</span>}
        </span>
      </div>

      <ul className="list">
        {stocks.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>

      <div style={{ marginTop: '40px', padding: '20px' }}>
        <DoughnutChart data={data} />
      </div>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = () => setShowWatchlistActions(true);
  const handleMouseExit = () => setShowWatchlistActions(false);

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
      <div className="item">
        <span className={`symbol ${stock.isDown ? "down" : "up"}`}>{stock.name}</span>
        <div className="item-info">
          <span className="price">{stock.price}</span>
          <span className={`percent ${stock.isDown ? "down" : "up"}`}>{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="btn btn-buy" onClick={() => openBuyWindow(uid)}>
            Buy
          </button>
        </Tooltip>

        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="btn btn-sell" onClick={() => openSellWindow(uid)}>
            Sell
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
