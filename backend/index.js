import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import doctorRoute from './Routes/doctor.js';
import reviewRouter from './Routes/review.js';
import bookingRoute from  './Routes/booking.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// CORS options to allow both local and production origins
const allowedOrigins = [
    'http://localhost:5173',  // Local development origin
    'https://doctorappoint-frontend.onrender.com'  // Production origin
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // Allow credentials like cookies, authorization headers
};

// Test route
app.get('/', (req, res) => {
    res.send('working on this');
});

// Database connection
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Mongodb Database is connected');
    } catch (error) {
        console.log('Mongodb Database connection failed', error);
    }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));  // Use updated CORS configuration
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors', doctorRoute);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRoute);

// Start server
app.listen(port, () => {
    console.log('Server is running on port ' + port);
    connectDB();
});
