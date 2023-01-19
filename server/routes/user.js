import express from 'express'
import { loginUser, signupUser } from "../controllers/user.js"

const router = express.Router()

router.post('/login', loginUser)

router.post('/create', signupUser)

export default router