const mongoose = require('mongoose')
// * This api let us hidde better the password
//bcrypt forces us to use a salt -> an extra ramdon string to the user password (each of them is a unique code)
const bcrypt = require('bcrypt')

// * For validate inputs --> npm i validator
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
     //if there is an existing record of the email, it won't let you use it twice to create two different accounts
    //it will be recorded only once on db
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

//* Creating a STATIC signup method
// User.signup(); 
userSchema.statics.signup = async function(email, password) {
// * Validating inputs
  // const exists = await this.findOne({ email })
  // if (exists) {
  //   throw Error('Email already in use')
  // }

  if(!email || !password) {
    throw Error('All fields must be filled')
  }
  //using the validator package
  if(!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }

  if(!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough')
  }

//bcrypt forces us to use a salt -> an extra ramdon string to the user password (each of them is a unique code)
    //await-> this takes a time to be complete
    //the number reflects the legth of the string
  const salt = await bcrypt.genSalt(10)
   //now we will hash the password => we are adding the ramdon staring to the password
  const hash = await bcrypt.hash(password, salt)
//after checking that the email is unique and the password is protected we create a new file with those values
  const user = await this.create({ email, password: hash })

  return user
}
//exporting this schema as a model so everytime you want to use it you can access by User
module.exports = mongoose.model('User', userSchema)