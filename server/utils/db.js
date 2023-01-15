import sqlite3 from 'sqlite3'
import { DB_PATH } from '../config/config.js'

export const db = new sqlite3.Database(DB_PATH, (error) => {
    if (error) console.error(error)
})

export const closeDb = (db) => {
    db.close((error) => {
        if (error) {
            console.error(error.message)
        } else {
            console.log('DB Connection closed')
        }
    })
}