const User = require('../models/userModel')

//* Importing json web tokens (JWS)
const jwt = require('jsonwebtoken');

//* Creating the tokens
//Everytime we add a new user to the db, automatically an id is attached to it (access to the id by _id)
const createToken = (_id) => {
  //sign(payload) => the object with the id represents the payload (the user data that will be encoded to form the token)
  // ? How does the token look like?
   //it is a encoded version of header.payload.signature
   // header: the algorithm used to encode by jwt
   //payload: the data from the user (id, name, email...), identificators //! don't add sensitive data
   //signature: a random string called "secret", this will be only known by the server
   //if a user wants to log in and the secret doesn't match any signature, that person won't have access to the web

  //payload: id / secret: a string hidded on the environment variables / expiress in 3 days: the user can be loged in up to three days then the token will expire
  //* Token
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}
//* login a user --> we need to check if the email and password exist on db and if it match we create a token and send it back to the client (authoritation to get in)
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    //the login method checks if email exist on the db, after checks if the password matchs with the one asociated to the email on db, and returns the user credentials
    const user = await User.login(email, password)

    // * Create a token for the user id from db
    const token = createToken(user._id);

    res.status(200).json({email, token});
    
  } catch (error) {
    //credentials not found
     res.status(400).json({error: error.message})
  }


}

//* signup a user --> storing user information and assigning a token
const signupUser = async (req, res) => {
     //From the request body (the form sends to the backend) get those values
  const {email, password} = req.body

  try {
    //the signup method checks if email is a unique value and hashes the password (protects it before getting on db)
    const user = await User.signup(email, password)
    //the signup method returns and object with the following structure: const user = await this.create({email, password: hash});

    // * Create a token for the user id from db
    const token = createToken(user._id);
    //would be something like = eyJhbGciOiJIUzI1NiInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDcwODNhNjE4ZDVhMWJmZDViZjQ2ODIiLCJpYXQiOjE2ODUwOTUzMzQsImVNTM1NDUzNH0.6uyP7lXKdQecN5NvKewEfQaDN4P9ATTSkegh5GWTw8"

    res.status(200).json({email, token});
    
  } catch (error) {
     //email already in use error and errors from mongoose (no email provided or no password)
     res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }