import mongoose, { Types } from "mongoose";

export type UserDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  otp: string;
  expired_at: Date;
};

export type UserDocument = mongoose.Document & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  otp: string;
  expired_at: Date;
  verifiedEmail: boolean;
  verifiedPhoneNumber: boolean;

  lastLoginDevice: {
    userAgent: String;
    appVersion: String;
    platform: String;
    platformVersion: String;
    device: String;
    notificationToken: String;
    expoPushNotificationToken: String;
    devicePushNotificationToken: String;
  };

  comparePassword(candidatePassword: string): Promise<boolean>;
  generateJWT(): Promise<string>;
};
