import express from 'express'
import { verifyToken} from '../middleware/auth.js'
import { loginUser, signupUser, updateUser, authUser } from "../controllers/user.js"

const router = express.Router()

router.post('/login', loginUser)

router.post('/create', signupUser)

router.patch('/update', verifyToken, updateUser)

router.post('/auth', verifyToken, authUser)

export default router