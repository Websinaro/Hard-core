import cors from "cors";
import helmet from "helmet";
import express from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/config";
import authRoutes from "./modules/auth/auth.routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(helmet());
app.use(cors({
    origin: config.frontendUrl,
    credentials: true,
}));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (_req,res) => {
    res.status(200).json({
        success: true,
        message: "Hard core web ssrved running for mlre information go to our website.......",
    });
});

app.get("/health", (_req,res) => {
    res.status(200).json({
        success: true,
        message: "Hard Core Server",
    });
});

app.use(errorMiddleware);

export default app;