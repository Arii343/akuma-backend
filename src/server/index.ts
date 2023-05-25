import express from "express";
import morgan from "morgan";

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.use(morgan("dev"));

export default app;
