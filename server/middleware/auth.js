/**
 * @file auth.js
 * @fileoverview This file contains all the functions that are used to handle authentication of users using JSON Web Tokens
 * 
 * @author {Lukas Andersson, Theo Lindqvist}
 * @version 1.0
 * 
 * @requires express
 * @requires ../config/config
 * @requires jsonwebtoken
 * 
 * @exports verifyToken
 */
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'

/**
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 * 
 * @description This function is used to verify the token of a user
 * 
 * @returns {object} error object
 * 
 * @requires SECRET_KEY from config.js
 * @requires jsonwebtoken
 */
export const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    return res
      .status(403)
      .send({ success: false, message: 'No token provided.' })
  }
  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .send({ success: false, message: 'Failed to authenticate token.' })
    }
    req.userId = decoded.id
    next()
  })
}
