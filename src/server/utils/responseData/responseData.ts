import CustomError from "../../../CustomError/CustomError.js";
import { type ErrorStructure } from "./types.js";

export const responseErrorData: ErrorStructure = {
  animeNotFound: new CustomError("Anime not found", 404),
  errorAddAnime: new CustomError("Couldn't add the anime", 400),
  wrongCredentials: new CustomError("Wrong credentials", 401),
  tokenNotFound: new CustomError("Token not found", 401),
  invalidToken: new CustomError("Invalid token", 401),
  endpointNotFound: new CustomError("Endpoint not found", 404),
  serverError: new Error("Internal server error"),
};
