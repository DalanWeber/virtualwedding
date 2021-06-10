//Import the stuff
require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authController = require('./controllers/authController')
const postController = require('./controllers/postController')
const gbController = require('./controllers/guestbookController')
const gController = require('./controllers/guestController')
const mailerctrl = require('./controllers/mailerController')
const path = require('path')
//destructure variables off the .env file
const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT,S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

//Instance the app
const app = express()
const aws = require('aws-sdk');

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

//S3 endpoints
app.get('/api/signs3', (req, res) => {
    aws.config = {
      region: 'us-west-1',
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    };
  
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read',
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
      };
  
      return res.send(returnData);
    });
  });


  //nodemailer
app.put('/api/guest/send' , mailerctrl.send)

app.use(express.static(__dirname + '/../build'))
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname,'../build/index.html'))
})






// app.put('/api/deletes3',(req,res) => {
//   aws.config = {
//     region: 'us-west-1',
//     accessKeyId: AWS_ACCESS_KEY_ID,
//     secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   };

//   const s3 = new aws.S3();
//   const key = req.query['key'];
//   const params = { 
//     Bucket: S3_BUCKET,
//     Key: key,
//   }



//   s3.deleteObject(params, function(err,data) {
//     if(err) {
//      console.log(err,err.stack);
//     }
//     else {
//      console.log(data);
//     }
//    });
// })