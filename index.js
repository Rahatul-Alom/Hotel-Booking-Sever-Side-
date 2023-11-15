const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cep75go.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// middleware



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const roomsCollection = client.db('roomDB').collection('rooms')

    // auth related api
    app.post('/jwt', async(req, res)=>{
      const user = req.body;
      console.log('user for token', user)
      res.send(user)

      const token = jwt.sign(uesr, 'secret', {expiresIn: '1hr'} )
      res.send(token)
    })



    // rooms api
    app.get('/rooms', async (req, res)=>{
      const cusor = roomsCollection.find();
      const result = await cusor.toArray();
      res.send(result)
    })

    app.get('/rooms/:id', async (req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await roomsCollection.findOne(query)
      res.send(result)
    })


    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('Hotel Server is running')
});

app.listen(port, ()=>{
    console.log(`Hotel server is runnig this port:${port}`)
})