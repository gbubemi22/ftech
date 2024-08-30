import { Router } from "express";
import UserRouter from "../module/user/index.js";
import WalletRouter from "../module/wallet/index.js";
import TransactionRouter from "../module/transaction/index.js"

const USER = `/v1/auth`;
const Wallet = `/v1/wallets`;
const TRANSACTION = `/v1/transactions`

const route = Router();

route.use(USER, UserRouter);
route.use(Wallet, WalletRouter);
route.use(TRANSACTION, TransactionRouter)

export default route;
