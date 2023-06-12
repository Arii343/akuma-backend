import { Joi } from "express-validation";
import { type AnimeStateStructure } from "../../types";

const addAnimeSchema = {
  body: Joi.object<AnimeStateStructure>({
    englishTitle: Joi.string().required(),
    japaneseTitle: Joi.string().required(),
    releaseYear: Joi.number().required(),
    rating: Joi.string().required(),
    demographics: Joi.array().items(Joi.string()).required(),
    genres: Joi.array().items(Joi.string()).required(),
    image: Joi.string().required(),
    score: Joi.number().required(),
    rank: Joi.number().required(),
    popularity: Joi.number().required(),
    type: Joi.string().required(),
    source: Joi.string().required(),
    episodes: Joi.number().required(),
    status: Joi.string().required(),
    duration: Joi.string().required(),
    synopsis: Joi.string().required(),
  }),
};

export default addAnimeSchema;
