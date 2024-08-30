import mongoose from "mongoose";
import { v1 as uuidV1, v4 as uuidV4, validate as UUIDValidation } from "uuid";

const connectDB = (url: string) => {
  mongoose.set("strictQuery", false);

  return mongoose.connect(url);
};

const getOtpExpiryTime = () => {
  const expiredAtDate = new Date(new Date().getTime() + 1000 * 60 * 10); // 10 minutes
  return expiredAtDate;
};

export { getOtpExpiryTime, connectDB };
