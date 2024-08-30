import mongoose from "mongoose";

export type WalletData = {
  userId: mongoose.Types.ObjectId;
  balance: number;
};

const WalletSchema = new mongoose.Schema<WalletData>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    balance: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  {
    timestamps: true,
    collection: "wallet",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Wallet = mongoose.model<WalletData>("wallet", WalletSchema);
export default Wallet;
