import express from 'express';
import { login, registerUser } from '../Controller/authController.js';
const loginrouter = express.Router();
loginrouter.post('/login',login);
loginrouter.post('/register',registerUser);
export default loginrouter;