/**
 * @file db.js
 * @fileoverview Database connection
 * 
 * @author {Lukas Andersson, Theo Lindqvist}
 * @version 1.0
 * 
 * @requires sqlite3
 * @requires ../config/config
 * 
 * @exports db
 * @exports closeDb
 * 
 * @typedef {function} db
 * @typedef {function} closeDb
 * 
 * @description This file contains the database connection and a function to close the connection
 */
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