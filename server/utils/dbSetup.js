/**
 * @file dbSetup.js
 * @fileoverview This file contains the function that sets up the database
 * 
 * @param {import('sqlite3').Database} db
 * 
 * @author {Lukas Andersson, Theo Lindqvist}
 * @version 1.0
 * 
 * @requires bcrypt
 * @requires ./db
 * 
 * @typedef {function} dbSetup
 * @typedef {function} closeDb
 * 
 * @description This file contains the function that sets up the database
 * 
 * @exports dbSetup
 */
import * as bcrypt from 'bcrypt'
import { db, closeDb } from './db.js'

let password1 = 'pearade'
let password2 = 'lemonade'

const dbSetup = async (db) => {
    password1 = await bcrypt.hash(password1, 10)
    password2 = await bcrypt.hash(password2, 10)

    db.serialize(() => {
        db.run(`
        CREATE TABLE IF NOT EXISTS "users" (
            "id"	INTEGER NOT NULL UNIQUE,
            "username"	TEXT NOT NULL UNIQUE,
            "password"	TEXT NOT NULL,
            "tags"	TEXT,
            "rating" TEXT,
            PRIMARY KEY("id")
        )`)
        .run(`INSERT INTO users(username, password) VALUES (?, ?)`, ['lukas', password1])
        .run(`INSERT INTO users(username, password) VALUES (?, ?)`, ['theo', password2], (error) => error
            ? console.error(error.message)
            : console.log('DB was initiated')
        )
    })
}

await dbSetup(db)
closeDb(db)