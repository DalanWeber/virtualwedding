//Import the stuff
require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const authContorller = require('./controllers/authController')

//destructure variables off the .env file
const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env

//Instance the app
const app = express()

//middleware that we need
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000*60*60}
}))

//connect the db
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false} 
})
.then(db =>{
    app.set('db', db)
    console.log('We up in that DB')
    app.listen(SERVER_PORT, ()=> console.log(`and we runnin on that ${SERVER_PORT}`))
})
.catch(err => console.log(err))

//Auth Endpoints
app.post('/api/auth/register', authContorller.register)
app.post('/api/auth/login', authContorller.login)
app.get('/api/auth/guest', authContorller.getGuest)
app.post("/api/auth/logout", authContorller.logout)


