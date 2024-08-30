import mongoose from "mongoose";



export type TransactionDocument = {
     userId: mongoose.Types.ObjectId;
     service: string;
     amount: number;
     totalAmount: number;
     status: boolean;
     paymentMethod: string;
     reference: string;
}