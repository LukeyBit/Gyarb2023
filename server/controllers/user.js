/**
 * @file user.js
 * @fileoverview This file contains all the functions that are used to handle user requests
 * @author {Lukas Andersson, Theo Lindqvist}
 * @version 1.0
 * 
 * @requires express
 * @requires ../models/user
 * @requires ../config/config
 * @requires jsonwebtoken
 * 
 * @exports loginUser
 * @exports signupUser
 * @exports updatePass
 * @exports updateName
 * @exports updateTags
 * @exports updateRating
 * 
 * @typedef {object} Request
 * @typedef {object} Response
 * @typedef {object} token
 * @typedef {object} error
 * @typedef {object} user
 * @typedef {object} success
 * 
 * @property {boolean} success
 * @property {string} message
 * @property {string} id
 * @property {string} username
 * @property {string} password
 * @property {string} tags
 * @property {string} rating
 * 
 */

import { checkUser, createUser, updatePassword, updateUsername, tagsUpdate, ratingUpdate } from '../models/user.js'
import { SECRET_KEY } from '../config/config.js'
import jwt from 'jsonwebtoken'

/**
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * 
 * @description This function is used to login a user
 * 
 * @returns {object} user object and {token} token object
 * @returns {object} error object
 */
export const loginUser = async (req, res) => {
    const { username, password } = req.body
    const user = await checkUser(username, password)
    if (user.success) {
        const id = user.user.id
        // Generate a new JSON Web Token (JWT) that expires in 24 hours
        const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: '24h' })
        res.json({ token, user: user.user })
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' })
    }
}


/**
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * 
 * @description This function is used to signup a user
 * 
 * @returns {object} success object
 * @returns {object} error object
 */
export const signupUser = async (req, res) => {
    const { username, password } = req.body
    const user = await createUser(username, password)
    if (user.success) {
        res.json({ success: user.success, message: user.message })
    } else {
        res.status(user.code).json({ success: user.success, message: user.message })
    }
}



/**
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * 
 * @description This function is used to update a user's password
 * 
 * @returns {object} success object
 * @returns {object} error object
 */
export const updatePass = async (req, res) => {
    const { id, password, oldPassword } = req.body
    const user = await updatePassword(id, password, oldPassword)
    if (user.success) {
        res.json({ success: user.success, message: user.message })
    } else {
        res.status(user.code).json({ success: user.success, message: user.message })
    }
}

/**
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * 
 * @description This function is used to update a user's username
 * 
 * @returns {object} success object
 * @returns {object} error object
 */
export const updateName = async (req, res) => {
    const { id, username } = req.body
    const user = await updateUsername(id, username)
    if (user.success) {
        res.json({ success: user.success, message: user.message })
    } else {
        res.status(user.code).json({ success: user.success, message: user.message })
    }
}

/**
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * 
 * @description This function is used to update a user's tags
 * 
 * @returns {object} success object
 * @returns {object} error object
 */
export const updateTags = async (req, res) => {
    const { id, tags } = req.body
    const user = await tagsUpdate(id, tags)
    if (user.success) {
        res.json({ success: user.success, message: user.message })
    } else {
        res.status(user.code).json({ success: user.success, message: user.message })
    }
}

/**
 * @async
 * @param {Request} req 
 * @param {Response} res 
 * 
 * @description This function is used to update a user's rating
 * 
 * @returns {object} success object
 * @returns {object} error object
 * 
 */
export const updateRating = async (req, res) => {
    const { id, rating } = req.body
    const user = await ratingUpdate(id, rating)
    if (user.success) {
        res.json({ success: user.success, message: user.message })
    } else {
        res.status(user.code).json({ success: user.success, message: user.message })
    }
}