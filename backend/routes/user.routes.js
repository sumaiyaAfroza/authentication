import express from "express";
import {authUser, getUserProfile, logout, registerUser} from "../controllers/user.controllers.js";
import {protect} from "../middleware/auth.middleware.js";

export  const router = express.Router()

router.post('/register', registerUser)
router.post('/login', authUser)
router.post('/logout', logout)
router.route('/profile')
      .get(protect,getUserProfile)
