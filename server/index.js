import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { db , closeDb } from './utils/db.js'
import { PORT } from './config/config.js'


import userRouter from './routes/user.js'

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

process.on('beforeExit', (code) => {
    closeDb(db)
})