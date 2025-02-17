const cors = require("cors");
const express = require("express");
const app = express();

// ✅ Enable CORS for Frontend
app.use(
  cors({
    origin: "https://front-end-plum-phi.vercel.app", // ✅ Allow only frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.use(express.json());

// ✅ Handle CORS Preflight Requests
app.options("*", cors());

// ✅ Fix CORS Headers for All Routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://front-end-plum-phi.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ Fix Route Path if Needed
app.post("/ai/get-review", (req, res) => {
  res.json({ message: "CORS issue fixed!" });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
