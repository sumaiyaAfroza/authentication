import asyncHandler from "express-async-handler";
import {User} from "../models/user.model.js";
import {generateToken} from "../utils/generate.token.js";

// register
export const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body
  const userExists = await User.findOne({email})

  if (userExists) {
    res.status(400)
    throw new Error('user already exists')
  }

  const user = await User.create({
    name, email, password
  })

  if (user) {
    generateToken(res, user._id)  // ✅ ঠিক - ছোট হাতের 'i'
    res.status(201).json({
      _id: user._id,  // এটাও ঠিক করুন
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error('invalid user data')
  }
})

// login
export const login = asyncHandler(async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)  // ✅ ঠিক - ছোট হাতের 'i'
    res.status(200).json({
      _id: user._id,  // এটাও ঠিক করুন
      name: user.name,
      email: user.email
    })
  } else {
    res.status(401)  // 400 থেকে 401 করুন
    throw new Error('invalid email or password')
  }
})

// logout
export const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({message: 'logout successfully'})
})

// profile
export const getProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }
  res.status(200).json(user)  // {user} না, শুধু user
})

// Update profile
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    const {currentPassword, name, email} = req.body

    // ✅ currentPassword check
    if (!currentPassword) {
      res.status(400)
      throw new Error('Current password is required')
    }

    // ✅ password verify
    const isMatch = await user.matchPassword(currentPassword)

    if (!isMatch) {
      res.status(401)
      throw new Error('Current password is incorrect')
    }

    // ✅ শুধু name আর email update করুন, password না!
    if (name) user.name = name
    if (email) user.email = email

    const savedUser = await user.save()

    res.status(200).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// update password
export const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    const {currentPassword, newPassword} = req.body

    if (!currentPassword || !newPassword) {
      res.status(400)
      throw new Error('please provide both current and new password')
    }

    const isMatch = await user.matchPassword(currentPassword)

    if (!isMatch) {
      res.status(401)
      throw new Error('current password is incorrect')
    }

    if (newPassword.length < 6) {
      res.status(400)
      throw new Error('password must be at least 6 characters')
    }

    // new password set
    user.password = newPassword
    await user.save()

    res.status(200).json({
      message: 'password updated successfully'
    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})