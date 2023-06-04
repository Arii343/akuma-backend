import { type NextFunction, type Request, type Response } from "express";
import { Anime } from "../../../database/models/Anime";

const getAnimes = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const animes = await Anime.find().limit(10).exec();

    res.status(200).json({ animes });
  } catch (error) {
    next(error);
  }
};

export default getAnimes;