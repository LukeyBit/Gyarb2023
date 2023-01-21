import { checkUser, createUser } from '../models/user.js'
import { SECRET_KEY } from '../config/config.js'
import jwt from 'jsonwebtoken'

export const loginUser = async (req, res) => {
    const { username, password } = req.body
    const user = await checkUser(username, password)
    if (user.success) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' })
        res.json({ token, user: user.user})
    } else {
        res.status(401).json({success: false, message: 'Invalid username or password' })
    }
}

export const signupUser = async (req, res) => {
    const { username, password } = req.body
    const user = await createUser(username, password)
    if (user.success) {
        res.json({ success: user.success, message: user.message })
    } else {
        res.status(401).json({ success: user.success, message: user.message })
    }
}