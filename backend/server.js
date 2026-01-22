import express from 'express'
import {connectDB} from "./config/db.js";
import cors from 'cors'
import {router as user} from "./routes/user.routes.js";

const app = express()
const port = process.env.PORT || 3000

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', (req,res) => {
 res.send('server ready')
})

// routes
app.use('/api/user', user)

app.listen(port, (res, req)=> {
  console.log(`server auth ok ${port}`)
})