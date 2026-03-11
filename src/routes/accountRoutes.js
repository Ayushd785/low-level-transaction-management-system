import express from 'express'
import cookieParser from 'cookie-parser'
import { createAccount } from '../controllers/accountController.js';
import { authMiddleware } from '../middlewares/authmiddleware.js';

const router = express.Router()


router.post("/",authMiddleware, createAccount)


export default router;
