const express = require("express");

 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
 
// This will help us connect to the database

const app = express();
// This help convert the id from string to ObjectId for the _id.

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const Router = express.Router();
 
 
// This section will help you get a list of all the records.
Router.route("/users").get(function (req, res) {
 let db_connect = dbo.getDb("users");
 db_connect
   .collection("users")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 

// This section will check the login information
Router.route("/login/:username").post(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = {name:req.params.username};
 let password = req.body.password;
 db_connect
     .collection("users")
     .findOne(myquery)
     .then(user => {
         if (user.password===password){
          console.log("login", user);
          console.log(req.session)
          req.session.user = new Object();
          req.session.user.name = user.name;
          req.session.user.task= user.task;
          console.log("login success", req.session);
          res.json({ msg: "successful" })
         } else {
          
          res.json({ msg: "it is not matched" })
         }
     })
     .catch(err =>{
      res.status(400).json({status:"error", msg: "could not find users"});
      console.log("Could not find the user", err);
  })
});
 
// This section will help you create a new record.
Router.route("/users/addUser").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.username,
    password: req.body.password,
    email: req.body.email,
    images: {},
    task: []
  };
  let myquery = {name:req.body.username};
  db_connect.collection("users")
  .findOne(myquery)
  .then(userResponse => {
    if (userResponse != null) {
      console.log("api user exists", myobj)
      response.status(400).json({ msg: "Username already exists" })
    } else {
      db_connect.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        let msg ="successfully resgisted"
        response.json({res,msg}); 
      })
    }
  })
  .catch(err => {
    let msg = "Error getting user by username"
    response.status(400).json({ msg: msg, err: "Error" });
    console.log(msg, err);
})
  
});

// //This is get the task data based on the username
// Router.route("gettask/:username").get(function(req, response){
//   let db_connect = dbo.getDb();
//   let username= params.username;
//   let myquery = {name:req.params.username};
//   db_connect.collection("users")
//   .findOne(myquery)
//   .then(user => {
//     let task = user.task;
//     res.json({task, msg:"successfully fetch"})})
//   .catch(err => {
//     res.status(400).json({ status: "error", msg: "could not find users" });
//       console.log("Could not find user", err);
//   })


// });

Router.route('/user/current').get(function(req,res,next) {
  console.log("session", req.session);
  console.log("current user", req.session.user);
  if ( req.session.user ) {
      //res.status(200).json(req.session.user);
      res.status(200).json({msg: "Successful",session:req.session.user});
  }
  else {
      res.status(200).json({msg: "You are not logged in"});
  }
});
 
// This section will help you update a record by id.
Router.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb(); 
 let myquery = { _id: ObjectId( req.params.id )}; 
 let newvalues = {   
   $set: {     
     name: req.body.name,    
     position: req.body.position,     
     level: req.body.level,   
   }, 
  }
});
 
// This section will help you delete a record
Router.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect.collection("users").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = Router;