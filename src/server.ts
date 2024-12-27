import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/AuthRoutes";
import projectRoutes from "./routes/ProjectRoutes";

dotenv.config(); // para usar variables de entorno

connectDB();

const app = express();

app.use(cors(corsConfig));

app.use(express.json()); // Leer datos del body en json (se envian desde forms, por ejemplo)

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

export default app;
