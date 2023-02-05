import { checkUser, createUser } from '../models/user.js'
import { SECRET_KEY } from '../config/config.js'
import jwt from 'jsonwebtoken'

export const loginUser = async (req, res) => {
    const { username, password } = req.body
    const user = await checkUser(username, password)
    if (user.success) {
        const id = user.user.id
        const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '24h' })
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
        res.status(user.code).json({ success: user.success, message: user.message })
    }
}

export const updateUser = (req, res) => {
    // Functionality to be added
}

export const authUser = (req, res) => {
    console.log('User authenticated')
    res.json({ success: true, message: 'User authenticated' })
}