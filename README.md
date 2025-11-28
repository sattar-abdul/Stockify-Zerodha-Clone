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


Finnhub's free API is used for fetching stock prices.

## Deployment

### Live URLs
- **Frontend**: https://stockify-frontend-t72l.onrender.com
- **Backend**: https://stockify-backend-rcs2.onrender.com
- **Dashboard**: https://stockify-dashboard.onrender.com

### Environment Variables

#### Frontend (Render)
```
REACT_APP_API_BASE=https://stockify-backend-rcs2.onrender.com
REACT_APP_DASHBOARD_URL=https://stockify-dashboard.onrender.com
```

#### Dashboard (Render)
```
REACT_APP_FINNHUB_API_KEY=your_finnhub_api_key
```

#### Backend (Render)
```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
PORT=5000
```

### Deployment Notes
- The frontend automatically detects production environment and uses production URLs
- Backend CORS is configured to allow requests from both frontend and dashboard domains
- All three applications are deployed separately on Render
