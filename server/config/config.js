/**
 * @file config.js
 * @description This file contains all the configuration variables
 * @author {Lukas Andersson, Theo Lindqvist}
 * @version 1.0
 */

export const DB_PATH = './database/users.sqlite'
export const SECRET_KEY = process.env.SECRET_KEY ||'iyhgyts65wtrfvbguoiikuytyrfvecb'
export const PORT = process.env.PORT || 5000