import React from "react";

function Footer() {
  return (
    <footer className="bg-body-secondary">
    <div className="container mt-5 border-top border-bottom">
      <div className="row mt-5">
        <div className="col">
          <img
            src="media/images/stockify-logo-without-bg.png"
            style={{ width: "45%" }}
            alt="logo"
          />
          <p>
            &copy; 2025, Stockify Brokerage Ltd (Personal project).<br /> All rights reserved.
          </p>
        </div>
        <div className="col">
          <p>Company</p>
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">About </a>
          <br />
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">Products </a>
          <br />
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">Pricing </a>
          <br />
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">Referral programme </a>
          <br />
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">Careers </a>
          <br />
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">Stockify.tech </a>
          <br />
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">Press & media </a>
          <br />
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">Stockify cares </a>
          <br />
         
        </div>
        <div className="col">
          <p>Support</p>
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">Contact </a>
          <br />
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">Support portal </a>
          <br />
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">Z-Connect blog </a>
          <br />
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">List of charges </a>
          <br />
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">Downloads & resources </a>
          <br />
        </div>
        <div className="col">
          <p>Account</p>
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">Open an account </a>
          <br />
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">Fund transfer </a>
          <br />
          <a href="" className="text-decoration-none text-muted text-black mb-2 d-inline-block">60 day challenge </a>
          <br />
        </div>
      </div>
      <div className="mt-5 fs-6 text-muted">
        <h6>About Stockify</h6>
        <p>
          Stockify is a modern and user-friendly platform that simulates stock
          trading for learning and personal use. With real-time market data
          integration, a sleek UI, and portfolio management tools, Stockify aims
          to help individuals understand the basics of stock markets, trading
          strategies, and financial analytics—all in a risk-free environment.
        </p>
        <h6>Features</h6>
        <p>
          Explore features like virtual stock trading, watchlists, interactive
          charts, and a paper-trading wallet. Track market trends and simulate
          trades without any real money involved. Whether you're a beginner or
          someone curious about investing, Stockify offers a safe place to
          experiment and grow your knowledge.
        </p>
        <h6>Disclaimer</h6>
        <p>
          This is a personal project developed for educational purposes only.
          Stockify is not affiliated with or endorsed by Zerodha, NSE, BSE, or
          any financial institution. No real trades occur on this platform, and
          none of the information should be interpreted as investment advice.
          All data displayed is either mocked or fetched from public APIs for
          demonstration only.
        </p>
      </div>
    </div>
    </footer>
  );
}

export default Footer;
