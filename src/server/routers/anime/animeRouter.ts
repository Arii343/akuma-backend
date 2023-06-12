import { Router } from "express";
import {
  addAnime,
  deleteAnime,
  getAnimes,
} from "../../controllers/anime/animeController.js";
import auth from "../../middlewares/auth/authMiddleware.js";
import { validate } from "express-validation";
import addAnimeSchema from "../../utils/schemas/animeSchema.js";

const animeRouter = Router();

animeRouter.get("/", getAnimes);

animeRouter.delete("/:id", auth, deleteAnime);

animeRouter.post(
  "/",
  auth,
  validate(addAnimeSchema, {}, { abortEarly: false }),
  addAnime
);

export default animeRouter;
