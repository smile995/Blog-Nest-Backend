const express = require('express')
const cors = require('cors');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port=process.env.PORT || 5000;

// middlewere to access data for different user
app.use(cors())
app.use(express.json())






const uri = "mongodb+srv://blogdb:wh0mfST8p0cMsRD7@cluster0.lc6lor4.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // getting data from mongodb <READ>
    app.get('/blog',async(req,res)=>{
        const cursor = blogCollection.find();
        const result=await cursor.toArray()
        res.send(result)
    })
   
    const database = client.db("insertDB");
    const blogCollection = database.collection("blogs");
    // <create> data
    app.post('/blog',async(req,res)=>{
        const blog=req.body
        console.log(blog);
        const result = await blogCollection.insertOne(blog);
        res.send(result)
    })
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  
  }
}
run().catch(console.dir);



app.get('/',(req,res)=>{
    res.send('Your server is running')
})
app.listen(port,()=>{
    console.log(`server running on ${port}`);
})