import express from "express";
import {authUser, logout, registerUser} from "../controllers/user.controllers.js";

export  const router = express.Router()

router.post('/register', registerUser)
router.post('/login', authUser)
router.post('/logout', logout)