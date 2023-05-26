const User = require('../models/userModel')

// login a user
const loginUser = async (req, res) => {
  res.json({mssg: 'login user'})
}

// signup a user
const signupUser = async (req, res) => {
     //From the request body (the form sends to the backend) get those values
  const {email, password} = req.body

  try {
    //the signup method checks if email is a unique value and hashes the password (protects it before getting on db)
    const user = await User.signup(email, password)
    //the signup method returns and object with the following structure: const user = await this.create({email, password: hash});

    res.status(200).json({email, user})
  } catch (error) {
     //email already in use error and errors from mongoose (no email provided or no password)
    res.status(400).json({error: 'Email is already in use'})
  }
}

module.exports = { signupUser, loginUser }