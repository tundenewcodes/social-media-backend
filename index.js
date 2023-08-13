import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3500

import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import { connectDB } from './config/dbConnect.js';
import { register } from './controllers/auth.js';
import { authMiddleware } from './middleware/authMiddleware.js';
import { createPost } from './controllers/posts.js';
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";


// CONFIGURATIONS

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({
    policy:'cross-origin'
}))
app.use(morgan('common'))
app.use(bodyParser.json({
    limit: '30mb',
    extended:true,
}))
app.use(bodyParser.urlencoded({limit: '30mb', extended:true}))
app.use(cors())


app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

 const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, 'public/assets')
 },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
}})

const upload = multer({storage})





//routes

app.post('/auth/register', upload.single('picture'), register)

app.post('/posts',authMiddleware, upload.single('picture'), createPost)

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts',postRoutes )

/* MONGOOSE SETUP */

 

  const start = async () => {
    try{
        await connectDB(process.env.MONGODB_URL, PORT)
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
//   User.insertMany(users);
//      Post.insertMany(posts);




    }
    catch(error) {
        console.log(`${error} did not connect`);
    }
  
  }
  start()