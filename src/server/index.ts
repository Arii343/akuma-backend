import express from "express";
import cors from "cors";
import morgan from "morgan";
import notFoundError from "./middlewares/notFoundError/notFoundError.js";
import { generalError } from "./middlewares/generalError/generalError.js";

const app = express();

const allowedOrigins = process.env.APP_URL!;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.disable("x-powered-by");

app.use(express.json());

app.use(morgan("dev"));

app.use(notFoundError);

app.use(generalError);

export default app;
