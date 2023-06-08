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
