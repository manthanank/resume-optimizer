const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const analyzeRoutes = require('./routes/analyze.routes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  "/",
  (req, res) => {
    res.send("Resume Optimizer API is running");
  }
);
app.use('/api', analyzeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
