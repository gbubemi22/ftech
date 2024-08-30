import mongoose from "mongoose";
import { TransactionDocument } from "./type.js";

const TransactionSchema = new mongoose.Schema<TransactionDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    service: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: Boolean,
      default: false,
    },

    paymentMethod: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "transaction",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Transaction = mongoose.model<TransactionDocument>(
  "transaction",
  TransactionSchema
);

export default Transaction;
