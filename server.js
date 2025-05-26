const express = require('express')
require('dotenv').config()
require('../Backend/config/database')
const cors = require('cors')
const bodyParser = require('body-parser');
const userRouter = require('../Backend/routes/userRouter')

const app = express()
const PORT = 8000


// Middleware
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,  // This allows credentials to be included in the request
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Main Routes endpoint

app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the Express Server!');
});



app.listen(PORT,()=>{
  console.log(`Server is running at http://localhost:${PORT}`);
    
})
