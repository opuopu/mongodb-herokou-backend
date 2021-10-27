const express = require("express");
const cors = require("cors");
require('dotenv').config()
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port =  process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// charity-foundation
// HEIZiNJJ4kDQUdjH
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dgoei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const database = client.db("CHARITY")
    const charitycollection=database.collection("services");
    const eventitem = database.collection("event-cart")
    // perform actions on the collection object
    // client.close();
    // -------------------post-----------------
    app.post('/adduser', async(req,res)=>{
      const result = await charitycollection.insertOne(req.body)
      res.send(result)
    })
    // ------------------get-----------
    app.get('/user', async(req,res)=>{
      const result = await  charitycollection.find({}).toArray()
      res.send(result)
    })
    // -------------------delete method------------
    app.delete('/delete/:id', async(req,res)=>{
      const query = req.params.id
      console.log(req.query);
      // console.log(req.params.id);
      const result = await charitycollection.deleteOne({_id:ObjectId(query)})
      res.send(result)
    })

    //----------------------get single user------------
    app.get('/user/:id', async(req,res)=>{
      const result= await charitycollection.findOne({_id:ObjectId(req.params.id)})
      res.send(result)
    })

    // ----------------------add to cart---------------------
    app.post('/addtoevent',async(req,res)=>{
      console.log(req.body);
const result =  await eventitem.insertOne(req.body)
res.send(result)
    })
    // -----------------------get---alll--event-------

    app.get('/eventitem/:email', async(req,res)=>{
console.log(req.params.email);
     
      const result =  await eventitem.find({email:req.params.email}).toArray()
      res.send(result)
    })
  });
  app.listen(port,{

  })
