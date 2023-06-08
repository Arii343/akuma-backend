import { type NextFunction, type Request, type Response } from "express";
import { Anime } from "../../../database/models/Anime.js";
import CustomError from "../../../CustomError/CustomError.js";

export const getAnimes = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const animes = await Anime.find({}, "_id englishTitle image")
      .limit(10)
      .exec();

    res.status(200).json({ animes });
  } catch (error) {
    next(error);
  }
};

export const deleteAnime = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const animeToDelete = await Anime.findByIdAndDelete(id).exec();

    if (!animeToDelete) {
      throw new CustomError("Anime not found", 404);
    }

    res.status(200).json({ message: "Anime deleted" });
  } catch (error) {
    next(error);
  }
};
