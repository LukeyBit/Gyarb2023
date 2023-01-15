import { db } from '../utils/db.js'

export const getUser = (req, res) => {
    db.all('SELECT * FROM users', (error, rows) => {
        if (error) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
            return
        }
        res.json(rows)
    })
}

export const createUser = (req, res) => {
    const { username, password } = req.body
    db.run('INSERT INTO users(username, password) VALUES (?, ?)', [username, password], (error) => {
        if (error) {
            console.error(error.message)
            res.status(400).json({ error: error.message })
            return
        }
        res.json({ message: 'User created' })
    })
}