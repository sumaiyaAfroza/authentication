import asyncHandler from "express-async-handler";
import {User} from "../models/user.model.js";

const registerUser = asyncHandler(async (req,res) => {
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