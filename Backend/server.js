import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';


dotenv.config();

// Create an Express application
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res)=>{
    res.send('API is running...');
});

connectDB();


// start the server - this tells Node.js "Start listening for incoming HTTP request on port 5001"
app.listen(5001, ()=> {
    console.log('Server is running on port 5001');
})
