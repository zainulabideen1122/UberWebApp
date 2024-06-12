const express = require('express')
require('dotenv').config()
const app = express()
const authRouter = require('./Routes/auth')
const mongoose = require('mongoose')
const cors = require("cors")

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };

mongoose.connect('mongodb://localhost:27017/uber')
.then(()=>{
    console.log("Connected to db!")
})

app.use(express.json())
app.use(cors(corsOptions))


app.use('/auth', authRouter)



module.exports = app