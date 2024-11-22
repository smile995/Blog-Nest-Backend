const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config(); // Ensure this is at the top to load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection URI with environment variables
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.password}@cluster0.lc6lor4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create MongoClient with server API options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // create database and collection
    const database = client.db("Blog_Nest")
    const blogCollection = database.collection("blogs")


    // posting data into database
    app.post("/add-blog", async (req, res) => {
      const blog = req.body;
      const result = await blogCollection.insertOne(blog)
      res.send(result).status(200)
    })
    // getting all data from database
    app.get("/blogs", async (req, res) => {
      const result = await blogCollection.find().toArray()
      res.send(result)
    })

    // finding single data from database by id
    app.get("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogCollection.findOne(query);
      res.send(result)
    })

    // wishlist 

    app.get("/wishlist/:bookId", async (req, res) => {
      let allBooked = [];
      const id = req.params.bookId
      allBooked.push(id)
      console.log(allBooked);
      
    })


    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}
run().catch(console.dir); // Run the connection

// Initial server response
app.get('/', (req, res) => {
  res.send('Blogs Nest coming soon...');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
