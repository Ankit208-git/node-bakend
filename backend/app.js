const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const checkAuth = require('./middleware/check-auth');

const Post = require('./models/post');
const userRoutes = require('./routes/user')


const app = express();

mongoose
  .connect(
    "mongodb+srv://AnkitVerma:xxxxxxxxxxxcluster0-woykq.mongodb.net/node-angular?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTIONS");
    next();
});
app.get("/api/posts",(req,res,next) => {
  Post.find().then((result) => {
    res.status(200).json({message: "Dummy sample for post data",posts: result})
    
  });
});
app.post("/api/posts",(req,res,next) => {
    const post = new Post({
      name: req.body.name,
      sex: req.body.sex,
      fatherName: req.body.father,
      motherName: req.body.mother,
      state: req.body.state,
      district:req.body.district

    });
    console.log(post);
    post.save().then( createdPost => {
      res.status(201).json({message: "Post added successfully", postId: createdPost._id });
      
    })
});
app.delete("/api/posts/:id",checkAuth,(req,res,next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
  

});
app.use("/api/user", userRoutes);

module.exports = app;