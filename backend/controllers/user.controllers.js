import asyncHandler from "express-async-handler";
import {User} from "../models/user.model.js";
import {generateToken} from "../utils/generate.token.js";

// register
export const registerUser = asyncHandler(async (req,res) => {
  const {name, email, password} = req.body
  const  userExists = await  User.findOne({email})
  if(userExists) {
    res.status(400)
    throw new Error('user already exists')
  }

  const user = await User.create({
    name,email,password
  })
  if(user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email
    })
  }
  else {
    res.status(400)
    throw  new Error('invalid user data')
  }
})


// login
export const authUser = asyncHandler(async  (req,res) => {
  const {email, password} = req.body

  const user = await User.findOne({email});

  if(user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email
    })
  }
  else {
    res.status(401)
    throw  new Error('invalid email & password')
  }
})


// logout
export const logout = asyncHandler(async (req, res) => {
  // best practice
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite : 'none',
    path: '/'
  })
  res.status(200).json({message: 'logout successfully'})

  // res.cookie('jwt', '', {
  //   httpOnly: true,
  //   expires: new Date(0)
  // })
})


// get user profile
export const getUserProfile = asyncHandler( async (req,res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }
  res.status(200).json({user})
})