import express from 'express'
import { Create, List } from './controller.js';
import { verifyToken } from '../../middleware/auth.js';



const router = express.Router()

router.route('/').post(verifyToken, Create)


router.route('/list').get(verifyToken, List)

export default router;