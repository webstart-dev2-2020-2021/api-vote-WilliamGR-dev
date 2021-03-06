console.log('hello')
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const dotenv = require('dotenv').config()

const authRouter = require('./routers/authRouter').router
const adminRouter = require('./routers/adminRouter').router
const voteRouter = require('./routers/voteRouter').router
const adminMid = require('./middlewares/adminMid')
const userMid = require('./middlewares/userMid')

const api = express()
api.use(express.json())
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }))
api.use(helmet())
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(
    'mongodb+srv:${DB_USER}:${DB_PASSWORD}@${DB_NAME}?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true }
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'ERROR: CANNOT CONNECT TO MONGO-DB'))
db.once('open', () => console.log('CONNECTED TO MONGO-DB'))

app.use('/admin/', adminMid, adminRouter)
app.use('/vote/', userMid, voteRouter)
app.use('/auth/', authRouter)

api.listen(3000, () => console.log('server lancé sur le port 3000'))
