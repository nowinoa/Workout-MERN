// * .env => We don't want to display sensitive information on our server (database connection, password...) so we must create an environment.
// * This document will store sensitive information in variables that we can then use. 
// *  This document will be hidden in the .gitignore.
// ! We will be using: npm i dotenv
// * This is how we connect the server to the environment as the document configuration
require('dotenv').config()
// * To make use of the environment vriables we need to invoque: process.env.VARIABLE
const express = require('express')
const mongoose = require('mongoose')
// * Importing the configured routes
const workoutRoutes = require('./routes/workouts')
// * Require auth routes
const userRoutes = require('./routes/user')

// express app
const app = express()

// ? MiddleWare
//By using app.use(express.json()), you are telling your Express application to use the express.json() middleware for
// all incoming requests to automatically parse and convert the JSON request
// body into a JavaScript object. This facilitates the handling and processing of JSON data in your application, 
//as you can access them more easily in req.body within your routes or controllers.
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// * routes
// The first parameter specifies in which path the routes will be launch. We have some routers configured on workout.js (/about)
// So to use the function that manages that secific route, the request should be made to /api/workouts/about. localhost:4000/about will show an error
// Usig this way we can create multiple routers
app.use('/api/workouts', workoutRoutes)
//api/user/login or api/user/signup
app.use('/api/user', userRoutes)

// ? Connectig to mongodb
// Placing app.listen within mongoose.connect ensures that the server starts listening only after establishing a database connection, preventing potential errors.
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
     //listen for requests
        //by adding this inside the mongoose co
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })