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

export const signupUser = (req, res) => {
    const { username, password } = req.body
    try {
        const user = createUser(username, password)
        if (user.success) {
            res.json({ message: user.message })
        }
    } catch (error) {
        res.status(user.code).json({ message: user.message })
    }
}