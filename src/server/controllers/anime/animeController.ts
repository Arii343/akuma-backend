import { type NextFunction, type Request, type Response } from "express";
import { Anime } from "../../../database/models/Anime.js";
import { type CustomRequest } from "../../types.js";
import { responseErrorData } from "../../utils/responseData/responseData.js";

export const getAnimes = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const animes = await Anime.find({}).limit(10).exec();

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
      throw responseErrorData.animeNotFound;
    }

    res.status(200).json({ message: "Anime deleted" });
  } catch (error) {
    next(error);
  }
};

export const addAnime = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const newAnime = await Anime.create({
      ...body,
    });

    if (!newAnime) {
      throw responseErrorData.errorAddAnime;
    }

    res.status(201).json({ anime: newAnime });
  } catch (error) {
    next(error);
  }
};
