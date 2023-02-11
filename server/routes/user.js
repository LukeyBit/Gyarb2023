import express from 'express'
import { verifyToken} from '../middleware/auth.js'
import { loginUser, signupUser, updatePass, updateName } from "../controllers/user.js"

const router = express.Router()

router.post('/login', loginUser)

router.put('/create', signupUser)

router.patch('/updatePassword',verifyToken, updatePass)

router.patch('/updateUsername',verifyToken, updateName)

export default router