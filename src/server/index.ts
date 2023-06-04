import express from "express";
import cors from "cors";
import morgan from "morgan";
import notFoundError from "./middlewares/notFoundError/notFoundError.js";
import { generalError } from "./middlewares/generalError/generalError.js";
import { pingController } from "./controllers/ping/pingController.js";
import userRouter from "./routers/user/userRouter.js";
import animeRouter from "./routers/anime/animeRouter.js";

const app = express();

const allowedOrigins = process.env.APP_URL!;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.disable("x-powered-by");

app.use(express.json());

app.use(morgan("dev"));

app.use("/user", userRouter);

app.use("/anime", animeRouter);

app.get("/", pingController);

app.use(notFoundError);

app.use(generalError);

export default app;
