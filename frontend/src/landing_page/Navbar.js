import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="container">
      <nav
        class="navbar navbar-expand-lg border-bottom"
        style={{ backgroundColor: "#FFF" }}
      >
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            <img
              src="media/images/stockify-logo-without-bg.png"
              style={{ width: "15%" }}
              alt="logo"
            />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex" role="search">
              <ul class="navbar-nav mb-lg-0">
                <li class="nav-item">
                  <Link class="nav-link active" to="/login">
                    Login
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active" to="/signup">
                    Signup
                  </Link>
                </li>
                <li class="nav-item ">
                  <Link class="nav-link active" to="/about">
                    About
                  </Link>
                </li>
                <li class="nav-item ">
                  <Link class="nav-link active" to="/product">
                    Products
                  </Link>
                </li>
                <li class="nav-item ">
                  <Link class="nav-link active" to="/pricing">
                    Pricing
                  </Link>
                </li>
                <li class="nav-item ">
                  <Link class="nav-link active" to="/support">
                    Support
                  </Link>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
