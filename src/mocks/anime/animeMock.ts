import { Types } from "mongoose";

export const animeMock = {
  image: "https://cdn.myanimelist.net/images/anime/1995/135164l.webp",
  englishTitle: "The Rising of the Shield Hero Season 3",
  japaneseTitle: "盾の勇者の成り上がり",
  type: "TV",
  source: "Light novel",
  episodes: 3,
  status: "Finished Airing",
  duration: "23 min",
  rating: "PG-13 - Teens 13 or older",
  score: 5,
  rank: 238,
  popularity: 776,
  synopsis: "Third season of Tate no Yuusha no Nariagari.",
  releaseYear: 2023,
  genres: ["Action", "Adventure", "Drama", "Fantasy"],
  demographics: ["Seinen", "Shounen"],
};

export const animeFullMetalAlchemistMock = {
  englishTitle: "Fullmetal Alchemist",
  japaneseTitle: "鋼の錬金術師",
  rating: "R - 17+ (violence & profanity)",
  demographics: ["Shounen"],
  genres: ["Action", "Adventure", "Award Winning", "Drama", "Fantasy"],
  image: "https://cdn.myanimelist.net/images/anime/10/75815l.webp",
  score: 8.11,
  rank: 442,
  popularity: 76,
  type: "TV",
  source: "Manga",
  episodes: 51,
  status: "Finished Airing",
  duration: "24 min per ep",
  releaseYear: 2023,
  synopsis:
    "Edward Elric, a young, brilliant alchemist, has lost much in his twelve-year life: when he and his brother Alphonse try to resurrect their dead mother through the forbidden act of human transmutation, Edward loses his brother as well as two of his limbs. With his supreme alchemy skills, Edward binds Alphonse's soul to a large suit of armor.\n\nA year later, Edward, now promoted to the fullmetal alchemist of the state, embarks on a journey with his younger brother to obtain the Philosopher's Stone. The fabled mythical object is rumored to be capable of amplifying an alchemist's abilities by leaps and bounds, thus allowing them to override the fundamental law of alchemy: to gain something, an alchemist must sacrifice something of equal value. Edward hopes to draw into the military's resources to find the fabled stone and restore his and Alphonse's bodies to normal. However, the Elric brothers soon discover that there is more to the legendary stone than meets the eye, as they are led to the epicenter of a far darker battle than they could have ever imagined.\n\n[Written by MAL Rewrite]",
};

export const animesMock = [animeMock];

export const animeMockWithId = {
  ...animeMock,
  _id: new Types.ObjectId(),
};
