import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from "../../utils/errors.js";
import User from "./model.js";
import { UserDataType } from "./type.js";
import { DefaultResponseInt } from "../../utils/constant.js";
import { format } from 'date-fns';

export const create = async (payload: UserDataType) => {
  const existingUser = await User.findOne({
    $or: [{ phoneNumber: payload.phoneNumber }, { email: payload.email }],
  });

  if (existingUser) {
    if (existingUser.phoneNumber === payload.phoneNumber) {
      throw new ConflictError(`Phone number already in use`);
    }
    if (existingUser.email === payload.email) {
      throw new ConflictError(`Email already in use`);
    }
  }

  const user = await User.create({ ...payload });

  const data = user.toJSON();

  return {
    success: true,
    message: "User created successfully",
    data,
  };
};

export const login = async (
  email: string,
  password: string
): Promise<DefaultResponseInt> => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new BadRequestError("Incorrect login details");
  }

  if (!(await user.comparePassword(password))) {
    throw new UnauthorizedError("Incorrect login details");
  }

  if (!user.verifiedEmail)
    throw new UnauthorizedError("Please verify your email");

  const token = await user.generateJWT();

  const data = {
    ...user.toJSON(),
    token,
  };

  //Update last login
  const formattedLastLogin = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  await User.findOneAndUpdate(
    { _id: user.id },
    { $set: { lastLogin: formattedLastLogin } }
  );

  return {
    success: true,
    message: `Welcome ${user.email}`,
    data,
  };
};
