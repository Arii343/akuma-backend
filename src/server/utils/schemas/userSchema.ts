import { type UserCredentials } from "../../types";
import { Joi } from "express-validation";

export const loginUserSchema = {
  body: Joi.object<UserCredentials>({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
