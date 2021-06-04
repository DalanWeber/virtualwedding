//Import the stuff
require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const authController = require('./controllers/authController')
const postController = require('./controllers/postController')
const gbController = require('./controllers/guestbookController')
const gController = require('./controllers/guestController')
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
app.post('/api/auth/register', authController.register)
app.post('/api/auth/login', authController.login)
app.get('/api/auth/guest', authController.getGuest)
app.post("/api/auth/logout", authController.logout)

//Post Endpoints
app.post('/api/post/create', postController.createPost)
app.get('/api/posts/read', postController.readPosts)
app.put('/api/posts/update', postController.editPost)
app.delete('/api/posts/delete/:id', postController.deletePost)

//guestbook endpoints
app.post('/api/guestbook/sign', gbController.createEntry)
app.get('/api/guestbook/read', gbController.readEntries)
app.delete('/api/guestbook/delete/:id', gbController.deleteEntry)

//guest endpoints
app.get('/api/guests/read', gController.readGuests)
app.put('/api/guests/edit', gController.editGuests)


