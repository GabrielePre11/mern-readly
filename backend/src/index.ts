import express from "express";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { db } from "./config/db";
import authRoutes from "./routes/auth.route";
import genreRoutes from "./routes/genre.route";
import bookRoutes from "./routes/book.route";

import { Request, Response } from "express";

//========= Configuration =========//
const app = express();
const PORT = process.env.PORT || 3000;

//========= Middleware =========//

// Express JSON
app.use(express.json());

// Helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// CORS
const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://mern-readly.vercel.app" // Live
    : process.env.CLIENT_URI ?? "http://localhost:5173"; // Local

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// Cookie Parser
app.use(cookieParser());

//========= Routes =========//
app.use("/api/auth", authRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/books", bookRoutes);

//========= Deployment =========//
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));
  app.get(/.*/, (req: Request, res: Response) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

//========= Server Starting =========//
app.listen(PORT, () => {
  db();
  console.log(`Server is running on port ${PORT}`);
});
