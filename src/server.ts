import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config(); // para usar variables de entorno

connectDB();

const app = express();

export default app;
