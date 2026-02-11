import express from 'express'
import {connectDB} from "./config/db.js";
import {router as user} from "./routes/user.routes.js";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {errorHandler, notFound} from "./middleware/error.middleware.js";

const app = express()
const port = process.env.PORT || 3000

connectDB()
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://authentication-six-psi.vercel.app/' : 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/user', user)

app.get('/', (_,res) => {
  res.send('auth server ready')
})

app.use(notFound)
app.use(errorHandler)
app.listen(port, ()=> {
  console.log(`server ok ${port}`)
})