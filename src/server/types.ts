import { type Request } from "express";
import type * as core from "express-serve-static-core";

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserData extends UserCredentials {
  _id: string;
}

export interface UserDataStructure extends UserCredentials {
  username: string;
  role: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export interface AuthRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  userId: string;
}

export type DemographicsStructure = string[];
export type GenresStructure = string[];

export interface AnimeStateStructure {
  englishTitle: string;
  japaneseTitle: string;
  releaseYear: number;
  rating: string;
  demographics: DemographicsStructure;
  genres: GenresStructure;
  image: string;
  score: number;
  rank: number;
  popularity: number;
  type: string;
  source: string;
  episodes: number;
  status: string;
  duration: string;
  synopsis: string;
}
export interface CustomRequest extends Request {
  body: AnimeStateStructure;
}
