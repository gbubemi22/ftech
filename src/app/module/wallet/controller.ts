import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import { create, getWallet } from "./service.js";





export const Create: Controller = async (req, res, next) => {
     try {
          const userId = req.user
       res.status(StatusCodes.CREATED)
       .json(await create(userId))   
     } catch (error) {
        next(error)  
     }
}

export const GetWallet: Controller = async (req, res, next) => {
     try {
          const userId = req.user
       res.status(StatusCodes.CREATED)
       .json(await getWallet(userId))   
     } catch (error) {
        next(error)  
     }
}
