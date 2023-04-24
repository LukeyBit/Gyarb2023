/**
 * file user.js
 * @fileoverview This file contains all the functions that are used to handle user requests
 * 
 * @author {Lukas Andersson, Theo Lindqvist}
 * @version 1.0
 * 
 * @requires express
 * @requires ../middleware/auth
 * @requires ../controllers/user
 * 
 * @exports router
 * 
 * @typedef {function} router
 */

import express from 'express'
import { verifyToken} from '../middleware/auth.js'
import { loginUser, signupUser, updatePass, updateName, updateTags, updateRating } from "../controllers/user.js"

const router = express.Router()

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
router.post('/login', loginUser)

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 * 
 * @description This function is used to create a new user
 * 
 * @returns {object} success object
 * @returns {object} error object
 */
router.put('/create', signupUser)

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 * 
 * @description This function is used to update a users password
 * 
 * @returns {object} success object
 * @returns {object} error object
 * 
 * @requires verifyToken middleware function to verify the token before updating the password
 */
router.patch('/updatePassword',verifyToken, updatePass)

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 * 
 * @description This function is used to update a users username
 * 
 * @returns {object} success object
 * @returns {object} error object
 * 
 * @requires verifyToken middleware function to verify the token before updating the username
 */
router.patch('/updateUsername',verifyToken, updateName)

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 * 
 * @description This function is used to update a users tags
 * 
 * @returns {object} success object
 * @returns {object} error object
 * 
 * @requires verifyToken middleware function to verify the token before updating the tags
 */
router.patch('/updateTags',verifyToken, updateTags)

/**
 * @async
 * @param {Request} req
 * @param {Response} res
 * 
 * @description This function is used to update a users rating
 * 
 * @returns {object} success object
 * @returns {object} error object
 * 
 * @requires verifyToken middleware function to verify the token before updating the rating
 */
router.patch('/updateRating',verifyToken, updateRating)

export default router