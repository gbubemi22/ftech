import { BadRequestError, NotFoundError } from "../../utils/errors.js";
import Wallet from "./model.js";

export const create = async (userId: string) => {
  const checkWallet = await Wallet.findOne({ userId: userId });

  if (checkWallet) throw new BadRequestError(`User already have a wallet`);

  const wallet = await Wallet.create(userId);

  return {
    status: true,
    message: `Wallet created`,
    data: wallet,
  };
};

export const getWallet = async (userId: string) => {
  const wallet = await Wallet.findOne({ userId: userId });

  if (!wallet) throw new NotFoundError(`Wallet found`);

  return {
    status: true,
    message: "fetched successfully",
    wallet,
  };
};

export const updateWalletBalance = async (userId: string, balance: number) => {
  const wallet = await Wallet.findOne({ userId: userId });

  if (!wallet) throw new NotFoundError(`Wallet not found`);

  await Wallet.findOneAndUpdate(
    { userId: userId },
    { $set: { balance: balance } },
    { new: true }
  );
};
