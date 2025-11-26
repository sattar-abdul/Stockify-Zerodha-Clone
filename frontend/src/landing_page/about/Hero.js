import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-3 text-center">
          We pioneered the discount broking model in India.
          <br />
          Now, we are breaking ground with our technology.
        </h1>
      </div>

      <div className="row p-5 border-top text-muted fs-6" style={{lineHeight:"1.8"}}>
        <div className="col p-5">
          <p>
            Welcome to Stockify, a simulated stock trading platform built to
            help aspiring investors, students, and curious minds explore the
            world of stock markets—without risking real money. Our mission is to
            simplify complex financial tools and make market learning more
            interactive and beginner-friendly.
          </p>
          <p>
            Stockify provides a clean, intuitive interface where users can
            simulate buying and selling of stocks, create watchlists, and
            analyze trends using real-time data and charts. The platform is
            designed to mimic the features of modern trading applications like
            Zerodha&apos;s Kite, allowing users to understand how stock trading
            works in a real-world-like environment.
          </p>
        </div>

        <div className="col p-5">
          <p>
            This project is entirely educational and experimental. It is a
            personal project developed by an individual developer to practice
            web development, UI/UX design, and integration with stock market
            APIs. Stockify does not execute any real trades, and none of the
            financial information shown should be taken as investment advice. We
            are not affiliated with Zerodha or any financial institution.
          </p>
          <p>
            Whether you&apos;re a student preparing for a career in finance, a
            developer exploring stock APIs, or just someone who wants to
            understand how trading apps function behind the scenes—Stockify
            offers you a safe and engaging playground to do just that. Happy
            trading (virtually)!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
