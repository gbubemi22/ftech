import Transaction from "./model.js";
import { TransactionDocument } from "./type.js";

export const listTransaction = async (userId: string) => {
  const transaction = await Transaction.find({ userId: userId });

  return {
    status: true,
    message: `Fetched`,
    transaction,
  };
};

export const CreateTransaction = async (payload: TransactionDocument) => {
  const transaction = await Transaction.create({ ...payload });

  return {
    status: true,
    message: `Created`,
    transaction,
  };
};
