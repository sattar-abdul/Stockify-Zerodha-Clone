require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");
const { UserModel } = require("./models/UserModel");
const auth = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";



// CORS configuration for production and development
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://stockify-frontend-t72l.onrender.com',
  'https://stockify-dashboard.onrender.com'
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(bodyParser.json());
mongoose.connect(uri);


app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  newOrder.save();

  res.send("Order saved");
});

// Auth routes
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    // Check if user already exists
    const existing = await UserModel.findOne({
      email: email.toLowerCase()
    });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Create new user (password will be hashed by pre-save hook)
    const newUser = new UserModel({
      username: name,
      email: email.toLowerCase(),
      password: password
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, name: newUser.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res
      .status(201)
      .json({
        token,
        user: {
          id: newUser._id,
          name: newUser.username,
          email: newUser.email
        }
      });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error during signup" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    // Find user in MongoDB
    const user = await UserModel.findOne({
      email: email.toLowerCase()
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
});

app.get("/api/auth/me", async (req, res) => {
  try {
    const auth = req.headers.authorization || "";
    const parts = auth.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res
        .status(401)
        .json({ message: "Missing or invalid Authorization header" });
    }

    const token = parts[1];
    const payload = jwt.verify(token, JWT_SECRET);

    // Find user in MongoDB
    const user = await UserModel.findById(payload.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token user" });
    }

    return res.json({
      user: { id: user._id, name: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Auth/me error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.listen(PORT, () => {
  console.log(`App started at port: ${PORT}`);
});
