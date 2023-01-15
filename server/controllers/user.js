import { db } from '../utils/db.js'
import bcrypt from 'bcrypt'

export const loginUser = async (req, res) => {
    const { username, password } = req.body
    // Check if user exists and compare password
    db.get('SELECT * FROM users WHERE username = ?', [username], async (error, row) => {
        if (error) {
            console.error(error.message)
            res.status(500).json({ error: error.message })
            return
        }
        if (row) {
            const match = await bcrypt.compare(password, row.password)
            if (match) {
                res.json({ 
                    message: 'User logged in',
                    data : {
                        loggedIn: true,
                        id: row.id,
                        username: row.username,
                        preferences: JSON.parse(row.preferences),
                        items: JSON.parse(row.items)
                    }
                })
            } else {
                res.status(401).json({ error: 'Invalid credentials' })
            }
        } else {
            res.status(401).json({ error: 'Invalid credentials' })
        }
    })
}

export const createUser = (req, res) => {
    const { username, password } = req.body
    db.run('INSERT INTO users(username, password) VALUES (?, ?)', [username, password], (error) => {
        if (error) {
            console.error(error.message)
            res.status(500).json({ error: error.message })
            return
        }
        res.json({ message: 'User created' })
    })
}