import { Schema, model } from "mongoose";

const animeSchema = new Schema({
  englishTitle: {
    type: String,
    require: true,
    unique: true,
  },
  japaneseTitle: {
    type: String,
    unique: true,
  },
  releaseYear: {
    type: Number,
  },
  rating: {
    type: String,
  },
  demographics: [
    {
      type: String,
    },
  ],
  genres: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
    require: true,
  },
  score: {
    type: Number,
  },
  rank: {
    type: Number,
  },
  popularity: {
    type: Number,
  },
  type: {
    type: String,
  },
  source: {
    type: String,
  },
  episodes: {
    type: Number,
  },
  status: {
    type: String,
  },
  duration: {
    type: String,
  },
  synopsis: {
    type: String,
    require: true,
  },
});

export const Anime = model("Anime", animeSchema, "animes");
