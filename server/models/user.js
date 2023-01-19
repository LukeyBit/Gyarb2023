import { db } from '../utils/db.js'
import bcrypt from 'bcrypt'


export const checkUser = async (username, password) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], async (error, row) => {
            if (error) {
                reject(error)
            }
            if (row) {
                const match = await bcrypt.compare(password, row.password)
                if (match) {
                    resolve({success: true, code: 200, user: {id: row.id, username: row.username, preferences: row.preferences, items: row.items}})
                } else {
                    resolve(false)
                }
            } else {
                resolve(false)
            }
        })
    })
}

export const createUser = async (username, password) => {
    password = await bcrypt.hash(password, 10)
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO users(username, password) VALUES (?, ?)', [username, password], function (error){
            if (error && error.message.includes('UNIQUE constraint failed: users.username')) {
                reject({success: false, code: 401, message: 'Username already exists'})
            } else if (error) {
                reject({success: false, code: 500, message: 'User not created'})
            }
            resolve({success: true, code: 200, message: 'User created'})
        })
    })
}