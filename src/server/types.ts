import { type Request } from "express";

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
