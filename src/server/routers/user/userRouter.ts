import { Router } from "express";
import { loginUserSchema } from "../../utils/schemas/userSchema";
import { validate } from "express-validation";
import loginUser from "../../controllers/user/userController";

const userRouter = Router();

userRouter.post(
  "/login",
  validate(loginUserSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
