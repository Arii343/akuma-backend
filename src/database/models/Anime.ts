import { Schema, model } from "mongoose";

const animeSchema = new Schema({
  englishTitle: {
    type: String,
    require: true,
    unique: true,
  },
  japaneseTitle: {
    type: String,
    require: true,
    unique: true,
  },
  releaseYear: {
    type: Number,
    require: true,
  },
  rating: {
    type: String,
    require: true,
  },
  demographics: [
    {
      type: String,
      require: true,
    },
  ],
  genres: [
    {
      type: String,
      require: true,
    },
  ],
  image: {
    type: String,
    require: true,
  },
  score: {
    type: Number,
    require: true,
  },
  rank: {
    type: Number,
    require: true,
  },
  popularity: {
    type: Number,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  source: {
    type: String,
    require: true,
  },
  episodes: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  duration: {
    type: String,
    require: true,
  },
  synopsis: {
    type: String,
    require: true,
  },
});

export const Anime = model("Anime", animeSchema, "animes");
