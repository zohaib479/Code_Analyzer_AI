const express = require('express')
const app = express()
const aiRoutes=require('./routes/ai.routes')
const cors=require('cors')
app.use(express.json())
// app.use(cors(
//   {
//     origin:["https://front-end-plum-phi.vercel.app"],
//     methods:["POST","GET"],
//     credentials:true
//   }
// ))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://front-end-plum-phi.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/ai',aiRoutes)


module.exports=app
