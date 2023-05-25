import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

const allowedOrigins = process.env.APP_URL!;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.disable("x-powered-by");

app.use(express.json());

app.use(morgan("dev"));

export default app;
