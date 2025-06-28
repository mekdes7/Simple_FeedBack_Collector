import express from 'express';
import { dbConfig } from './DbConfig/dbConfig.js';
import router from './Routes/feedbackRoutes.js';
import loginrouter from './Routes/authRoutes.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
dbConfig();
const PORT = process.env.PORT || 5000;
app.use('/api/feedback',router);
app.use('/api/auth',loginrouter);
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
