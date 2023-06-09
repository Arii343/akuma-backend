import { Router } from "express";
import {
  deleteAnime,
  getAnimes,
} from "../../controllers/anime/animeController.js";
import auth from "../../middlewares/auth/authMiddleware.js";

const animeRouter = Router();

animeRouter.get("/", getAnimes);

animeRouter.delete("/:id", auth, deleteAnime);

export default animeRouter;
