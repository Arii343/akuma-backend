import { Router } from "express";
import { loginUserSchema } from "../../utils/schemas/userSchema.js";
import { validate } from "express-validation";
import loginUser from "../../controllers/user/userController.js";

const userRouter = Router();

userRouter.post(
  "/login",
  validate(loginUserSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
