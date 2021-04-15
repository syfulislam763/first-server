const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const password = "kkua5DnM!pBTfUa";
const port = 8080;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const uri = `mongodb+srv://mongosCoder:${password}@cluster0.4ghr0.mongodb.net/userDB?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




let users = [{
    "id": 1,
    "first_name": "Susanna",
    "last_name": "Skittrall",
    "email": "sskittrall0@prlog.org",
    "gender": "Agender",
    "ip_address": "139.196.149.135"
  }, {
    "id": 2,
    "first_name": "Bernarr",
    "last_name": "Malinson",
    "email": "bmalinson1@uiuc.edu",
    "gender": "Female",
    "ip_address": "97.253.214.61"
  }, {
    "id": 3,
    "first_name": "Rozanna",
    "last_name": "Veitch",
    "email": "rveitch2@barnesandnoble.com",
    "gender": "Agender",
    "ip_address": "154.136.208.185"
  }, {
    "id": 4,
    "first_name": "Bartie",
    "last_name": "Van Vuuren",
    "email": "bvanvuuren3@npr.org",
    "gender": "Male",
    "ip_address": "197.68.36.161"
  }, {
    "id": 5,
    "first_name": "Mandel",
    "last_name": "Trevett",
    "email": "mtrevett4@imdb.com",
    "gender": "Genderqueer",
    "ip_address": "230.49.56.189"
  }, {
    "id": 6,
    "first_name": "Lesly",
    "last_name": "Trembath",
    "email": "ltrembath5@google.com",
    "gender": "Polygender",
    "ip_address": "83.201.29.49"
  }, {
    "id": 7,
    "first_name": "Tabatha",
    "last_name": "Murrells",
    "email": "tmurrells6@github.com",
    "gender": "Bigender",
    "ip_address": "36.150.199.32"
  }, {
    "id": 8,
    "first_name": "Caesar",
    "last_name": "O'Kinneally",
    "email": "cokinneally7@studiopress.com",
    "gender": "Male",
    "ip_address": "20.66.234.154"
  }, {
    "id": 9,
    "first_name": "Stafani",
    "last_name": "Greenrde",
    "email": "sgreenrde8@tinyurl.com",
    "gender": "Polygender",
    "ip_address": "141.237.84.218"
  }, {
    "id": 10,
    "first_name": "Ewart",
    "last_name": "Pele",
    "email": "epele9@nydailynews.com",
    "gender": "Male",
    "ip_address": "54.41.76.195"
  }]








app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
})





app.get("/user/:id", (req, res) => {
    let user = users.find(user => user.id === +req.params.id)
    user?res.send(user):res.send("User not found!");
})




client.connect(err => {
  const collection = client.db("userDB").collection("users");


  app.get("/users", (req, res) => {
    let allUsers = [];
    collection.find({}).toArray((err, documents) =>{
        allUsers = [...documents]
        res.send(allUsers);
    });
  })



  app.post("/addUser", (req, res) => {
    req.body.id = Math.ceil(Math.random()*1000 + 10);
    users.push(req.body);
    
    collection.insertOne(req.body)
    .then(result => {
      console.log("one user inserted");
      res.send("success")
    })
    .catch(e => console.log(e))
  })


  app.delete("/deleteUser/:id*?", (req, res) => {
    //console.log(req.params.id)
    collection.deleteOne({id: +req.params.id})
      .then(result => {
        res.send(result.deletedCount>0?"one user deleted":"no one deleted");
      })
      .catch(e => console.log(e.message))
  })
  
});





app.listen(port, () => {
    console.log(`server running at ${port} port`);
})



