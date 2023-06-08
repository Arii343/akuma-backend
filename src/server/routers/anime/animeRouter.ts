import { Router } from "express";
import { getAnimes } from "../../controllers/anime/animeController.js";

const animeRouter = Router();

animeRouter.get("/", getAnimes);

export default animeRouter;
