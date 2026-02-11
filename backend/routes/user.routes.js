import express from "express";
import {
  getProfile,
  login,
  logout,
  registerUser,
  updatePassword,
  updateProfile
} from "../controllers/user.controllers.js";
import {protect} from "../middleware/auth.middleware.js";

export const router = express.Router()

router.post('/register', registerUser)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', protect, getProfile)
router.put('/profile', protect, updateProfile)
router.put('/password', protect, updatePassword)