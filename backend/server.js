require('dotenv').config();
const express = require('express')
const router = require('./routes')
const app = express();
const PORT = process.env.PORT || 5500;
const DbConnect = require('./database')
const cors = require('cors');
const cookieParser = require('cookie-parser')

app.use(express.json({limit : '8mb'}))
const corsOptions = {
    credentials:true,
    origin :['http://localhost:3000'],
};
app.use(cors(corsOptions))
app.use(cookieParser());
app.use('/storage',express.static('storage'))

DbConnect();

app.use(router);


app.get('/',(req,res) =>{
    res.send('hello world')
})

app.listen(PORT,() => console.log(`Listening on port ${PORT}`))