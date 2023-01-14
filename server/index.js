import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { db , closeDb } from './utils/db.js'


import userRouter from './routes/user.js'

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())

app.use('/user', userRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

process.on('beforeExit', (code) => {
    closeDb(db)
})