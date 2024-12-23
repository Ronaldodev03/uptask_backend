import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/ProjectRoutes";

dotenv.config(); // para usar variables de entorno

connectDB();

const app = express();

app.use(express.json()); // Leer datos del body en json (se envian desde forms, por ejemplo)

// Routes
app.use("/api/projects", projectRoutes);

export default app;
