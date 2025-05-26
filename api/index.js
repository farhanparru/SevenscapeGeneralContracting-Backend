const express = require('express')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser');
const userRouter = require('../routes/userRouter')
const mongoose = require('mongoose')

const app = express()
const PORT = 8000


// Middleware
app.use(cors({
    origin: ['https://www.sevenscape.ae'],
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://farhanparru87:seven123456@cluster0.vrk9ss0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{  
  useNewUrlParser: true,
  useUnifiedTopology: true 
}).then(()=>console.log('Databse connected')).catch((err)=>console.log("err",err))

console.log("Conncted mongo");




// Main Routes endpoint

app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the Express Server!');
});



app.listen(PORT,()=>{
  console.log(`Server is running at http://localhost:${PORT}`);
    
})
