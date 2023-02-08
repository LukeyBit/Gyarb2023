import express from 'express'
import { verifyToken} from '../middleware/auth.js'
import { loginUser, signupUser, updateUser, updatePass, updateName } from "../controllers/user.js"

const router = express.Router()

router.post('/login', loginUser)

router.put('/create', signupUser)

router.patch('/update', verifyToken, updateUser)

router.patch('/updatePassword', updatePass)

router.patch('/updateUsername', updateName)

export default router