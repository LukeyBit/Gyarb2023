/**
 * @file user.js
 * @fileoverview User model for database actions
 * 
 * @author {Lukas Andersson, Theo Lindqvist}
 * @version 1.0
 * 
 * @requires bcrypt
 * @requires ../utils/db
 * 
 * @exports checkUser
 * @exports createUser
 * @exports updatePassword
 * @exports updateUsername
 * @exports tagsUpdate
 * @exports ratingUpdate
 * 
 * @typedef {string} username
 * @typedef {string} password
 * @typedef {string} oldPassword
 * @typedef {int} id
 * @typedef {object} success
 * @typedef {object} user
 * @typedef {object} error
 * 
 * @property {int} id
 * @property {string} username
 * @property {string} password
 * @property {string} tags
 * @property {string} rating
 * @property {boolean} success
 * @property {int} code
 * @property {string} message
 */
import { db } from '../utils/db.js'
import bcrypt from 'bcrypt'

/**
 * @async
 * 
 * @param {string} username 
 * @param {string} password 
 * 
 * @returns {Promise} promise object
 * @returns {object} user object
 * @returns {boolean} false
 * 
 * @description This function is used to check if a user exists in the database and if the submitted password matches the one in the database
 * 
 * @throws {error} error
 */
export const checkUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], async (error, row) => {
      if (error) {
        reject(error)
      }
      if (row) {
        //Compare hashed password with submitted password
        const match = await bcrypt.compare(password, row.password)
        if (match) {
          resolve({ success: true, code: 200, user: { id: row.id, username: row.username, tags: JSON.parse(row.tags), rating: JSON.parse(row.rating) } })
        } else {
          resolve(false);
        }
      } else {
        resolve(false)
      }
    })
  })
}

/**
 * @async
 * 
 * @param {string} username
 * @param {string} password
 * 
 * @returns {Promise} promise object
 * @returns {object} success object
 * @returns {object} error object
 * 
 * @description This function is used to create a new user in the database
 * 
 * @throws {error} error
 */
export const createUser = async (username, password) => {
  password = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users(username, password) VALUES (?, ?)', [username, password], (error) => {
      if (error && error.message.includes('UNIQUE constraint failed: users.username')) {
        resolve({ success: false, code: 401, message: 'Username already exists' })
      } else if (error) {
        reject(error)
      }
      resolve({ success: true, code: 200, message: 'User created' })
    })
  })
}

/**
 * 
 * @param {int} id 
 * @param {string} password 
 * @param {string} oldPassword 
 * 
 * @returns {Promise} promise object
 * @returns {object} success object
 * @returns {object} error object
 * 
 * @description This function is used to update the password of a user
 * 
 * @throws {error} error
 */
export const updatePassword = (id, password, oldPassword) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT password FROM users WHERE id = ?', [id], async (error, row) => {
      if (error) {
        resolve({ success: false, code: 500, message: 'User was not found' })
      }
      if (row) {
        const match = await bcrypt.compare(oldPassword, row.password)
        if (match) {
          password = await bcrypt.hash(password, 10)
          db.run('UPDATE users SET password = ? WHERE id = ?', [password, id], (error) => {
            if (error) {
              resolve({ success: false, code: 500, message: 'Password not updated' })
            }
          })
          resolve({ success: true, code: 200, message: 'Password updated' })
        }
        resolve({ success: false, code: 403, message: 'Password was not correct' })
      }
    })
  })
}

/**
 * 
 * @param {int} id 
 * @param {string} username 
 * 
 * @returns {Promise} promise object
 * @returns {object} success object
 * @returns {object} error object
 * 
 * @description This function is used to update the username of a user
 * 
 * @throws {error} error
 */
export const updateUsername = (id, username) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT username FROM users ', (error, row) => {
      if (error) {
        resolve({ success: false, code: 500, message: 'Server error' })
      }
      if (row) {
        if (row.username === username) {
          resolve({ success: false, code: 401, message: 'Username already exists' })
        }
        db.run('UPDATE users SET username = ? WHERE id = ?', [username, id], (error) => {
          if (error) {
            resolve({ success: false, code: 500, message: 'Server error' })
          }
          resolve({ success: true, code: 200, message: 'Username updated' })
        })
      }
    })
  })
}

/**
 * 
 * @param {int} id
 * @param {object} tags
 * 
 * @returns {Promise} promise object
 * @returns {object} success object
 * @returns {object} error object
 * 
 * @description This function is used to update a users tags
 * 
 * @throws {error} error
 */
export const tagsUpdate = (id, tags) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET tags = ? WHERE id = ?",
      [JSON.stringify(tags), id],
      (error) => {
        if (error) {
          resolve({ success: false, code: 500, message: "Server error" });
        }
        resolve({ success: true, code: 200, message: "Tags updated" });
      }
    )
  })
}

/**
 * 
 * @param {int} id 
 * @param {string} rating 
 * 
 * @returns {Promise} promise object
 * @returns {object} success object
 * @returns {object} error object
 * 
 * @description This function is used to update a users rating
 * 
 * @throws {error} error
 */
export const ratingUpdate = (id, rating) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET rating = ? WHERE id = ?",
      [JSON.stringify(rating), id],
      (error) => {
        if (error) {
          resolve({ success: false, code: 500, message: "Server error" });
        }
        resolve({ success: true, code: 200, message: "Rating updated" });
      }
    )
  })
}