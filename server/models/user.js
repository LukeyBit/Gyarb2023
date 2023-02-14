import { db } from "../utils/db.js"
import bcrypt from "bcrypt"

export const checkUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (error, row) => {
        if (error) {
          reject(error)
        }
        if (row) {
          const match = await bcrypt.compare(password, row.password)
          if (match) {
            resolve({
              success: true,
              code: 200,
              user: {
                id: row.id,
                username: row.username,
                preferences: row.preferences,
                items: row.items,
              },
            })
          } else {
            resolve(false)
          }
        } else {
          resolve(false)
        }
      }
    )
  })
}

export const createUser = async (username, password) => {
  password = await bcrypt.hash(password, 10)
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users(username, password) VALUES (?, ?)",
      [username, password],
      (error) => {
        if (
          error &&
          error.message.includes("UNIQUE constraint failed: users.username")
        ) {
          resolve({
            success: false,
            code: 401,
            message: "Username already exists",
          })
        } else if (error) {
          resolve({ success: false, code: 500, message: "User not created" })
        }
        resolve({ success: true, code: 200, message: "User created" })
      }
    )
  })
}

export const updatePassword = (id, password, oldPassword) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT password FROM users WHERE id = ?",
      [id],
      async (error, row) => {
        if (error) {
          resolve({ success: false, code: 500, message: "User was not found" })
        }
        if (row) {
          const match = await bcrypt.compare(oldPassword, row.password)
          if (match) {
            password = await bcrypt.hash(password, 10)
            db.run(
              "UPDATE users SET password = ? WHERE id = ?",
              [password, id],
              (error) => {
                if (error) {
                  resolve({
                    success: false,
                    code: 500,
                    message: "Password not updated",
                  })
                }
              }
            )
            resolve({
              success: true,
              code: 200,
              message: "Password updated",
            })
          }
          resolve({
            success: false,
            code: 403,
            message: "Password was not correct",
          })
        }
      }
    )
  })
}

export const updateUsername = (id, username) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT username FROM users ", (error, row) => {
      if (error) {
        resolve({ success: false, code: 500, message: "Server error" })
      }
      if (row) {
        if (row.username === username) {
          resolve({
            success: false,
            code: 401,
            message: "Username already exists",
          })
        }
        db.run(
          "UPDATE users SET username = ? WHERE id = ?",
          [username, id],
          (error) => {
            if (error) {
              resolve({ success: false, code: 500, message: "Server error" })
            }
            resolve({ success: true, code: 200, message: "Username updated" })
          }
        )
      }
    })
  })
}
