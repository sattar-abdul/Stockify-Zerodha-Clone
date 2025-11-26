# STOCKIFY - Zeordha Clone
---

# Project Analysis

## Overview
Stockify is a MERN stack application designed to clone the Zerodha stock trading platform. It is structured as a monorepo with three distinct components:

##### Backend: A Node.js/Express server handling API requests, authentication, and database interactions.

##### Frontend: A React application serving as the landing page.

##### Dashboard: A separate React application functioning as the trading dashboard (Kite clone).

## Component Details
1. Backend (/backend)
    - Framework: Express.js
    - Database: MongoDB (via Mongoose)
    - Authentication: Passport.js (Local Strategy), JWT, bcryptjs
    - Finnhub's free API is used for fetching stock prices.
    - Key Dependencies:
        express: Web framework
        mongoose: ODM for MongoDB
        passport, passport-local, passport-local-mongoose: Authentication
        jsonwebtoken: Stateless authentication
        cors: Cross-Origin Resource Sharing
        dotenv: Environment variable management
        body-parser: Request body parsing

2. Frontend (/frontend)
    - Type: Landing Page
    - Framework: React (v19)
    - Routing: React Router DOM (v7)
    - HTTP Client: Axios
    - Testing: Jest, React Testing Library
    - Styling: Likely custom CSS or Bootstrap (as mentioned in README)
    - Key Dependencies:
        react-router-dom: Routing
        axios: HTTP Client
        jest, @testing-library/react: Testing
        bootstrap: Styling

3. Dashboard (/dashboard)
    - Type: Trading Interface (Kite Clone)
    - Framework: React (v19)
    - UI Library: Material UI (@mui/material, @mui/icons-material)
    - Charting: Chart.js, react-chartjs-2
    - Routing: React Router DOM (v7)
    - Styling: Emotion (CSS-in-JS)
    - Key Dependencies:
        @mui/material, @mui/icons-material: UI Library
        chart.js, react-chartjs-2: Charting
        react-router-dom: Routing
        emotion: Styling
