const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoute');

// Environment configuration loaded
dotenv.config();
const app = express();

app.use(cors());    
app.use(express.json());
connectDB();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/application', applicationRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Job Board API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});