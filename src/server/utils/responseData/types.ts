import type CustomError from "../../../CustomError/CustomError";

export interface ErrorStructure {
  animeNotFound: CustomError;
  errorAddAnime: CustomError;
  wrongCredentials: CustomError;
  tokenNotFound: CustomError;
  invalidToken: CustomError;
  endpointNotFound: CustomError;
  serverError: Error;
}
