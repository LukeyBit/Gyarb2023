import express from 'express'
import { verifyToken} from '../middleware/auth.js'
import { loginUser, signupUser, updateUser } from "../controllers/user.js"

const router = express.Router()

router.post('/login', loginUser)

router.post('/create', signupUser)

router.patch('/update', verifyToken, updateUser)

export default router