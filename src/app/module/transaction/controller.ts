import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import { CreateTransaction, listTransaction } from "./service.js";

export const Create: Controller = async (req, res, next) => {
  try {
    const userId = req.user;
    res
      .status(StatusCodes.CREATED)
      .json(await CreateTransaction({ userId, ...req.body }));
  } catch (error) {
    next(error);
  }
};

export const List: Controller = async (req, res, next) => {
  try {
    const userId = req.user;
    res.status(StatusCodes.OK).json(await listTransaction(userId));
  } catch (error) {
    next(error);
  }
};
