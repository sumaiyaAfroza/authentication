import express from 'express'

const app = express()
const port = process.env.PORT || 3000
app.get('/', (req,res) => {
 res.send('server ready')

})

app.listen(port, (res, req)=> {
  console.log(`server auth ok ${port}`)
})