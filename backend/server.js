import express from 'express'
import {connectDB} from "./config/db.js";
import cors from 'cors'
import {router as user} from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import {errorHandler, notFound} from "./middleware/error.middleware.js";

const app = express()
const port = process.env.PORT || 3000

connectDB()

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? "" : "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.get('/', (req,res) => {
 res.send('server ready')
})

// routes
app.use('/api/user', user)

app.use(notFound)
app.use(errorHandler)

app.listen(port, (res, req)=> {
  console.log(`server auth ok ${port}`)
})
