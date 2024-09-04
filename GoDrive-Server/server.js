const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require('./routes/driverRoutes');
const tripsRouter = require('./routes/tripRoutes');
const driverListRouter = require('./routes/driverListRouter'); 
const tripListRouter = require("./routes/tripListRouter");  
const accessRoutes = require('./routes/accessRoutes'); 
const blogsRouter = require('./routes/blogsroutes');

const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/trip-list', tripListRouter);
app.use('/api/driver-list', driverListRouter);
app.use('/api/trips', tripsRouter); 
app.use('/api/access-control', accessRoutes);
app.use('/api/blogs', blogsRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
