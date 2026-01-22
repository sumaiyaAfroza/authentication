import express from "express";
import {authUser, registerUser} from "../controllers/user.controllers.js";

export  const router = express.Router()

router.post('/register', registerUser)
router.post('/login', authUser)