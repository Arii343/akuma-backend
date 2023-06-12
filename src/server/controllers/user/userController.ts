import { type NextFunction, type Response } from "express";
import { type UserCredentialsRequest } from "../../types";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { User } from "../../../database/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";

const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError("Wrong credentials", 401);

      throw customError;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default loginUser;
