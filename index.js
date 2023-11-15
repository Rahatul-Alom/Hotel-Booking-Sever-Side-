const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());




app.get('/', (req, res)=>{
    res.send('Hotel Server is running')
});

app.listen(port, ()=>{
    console.log(`Hotel server is runnig this port:${port}`)
})