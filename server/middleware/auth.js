import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'

export const verifyToken = (req, res, next) => {
    console.log(req.headers)
    const token = req.headers['x-access-token']
    if (!token) {
        console.log('No token provided.')
        return res.status(403).send({ success: false, message: 'No token provided.' })
    }
    jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) {
            console.log('Failed to authenticate token.')
            return res.status(500).send({ success: false, message: 'Failed to authenticate token.' })
        }
        req.userId = decoded.id
        next()
    })
}