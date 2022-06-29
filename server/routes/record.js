const express = require("express");
const path = require("path");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
 
// This will help us connect to the database

const app = express();
// This help convert the id from string to ObjectId for the _id.

const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const Router = express.Router();
const clothData = require("../routes/clothing-api.json");

const csv = require('csv-parser')
const fs = require('fs')
const CSVresults = [];

var readStream = fs.createReadStream(path.join(__dirname, './') + 'ready.csv', 'utf8');


  readStream.pipe(csv())
  .on('data', (data) => CSVresults.push(data))
  .on('end', () => {
    // console.log(CSVresults);
  });



 
 
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
          req.session.user.image_photo= user.image_photo;
          req.session.user.images= user.images;
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
 
// register:firstly check if the username is already used t
Router.route("/users/addUser").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.username,
    password: req.body.password,
    email: req.body.email,
    image_photo: req.body.image,
    images:[],
    task: [],
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

//get the current user from the session
Router.route('/user/current').get(function(req,res,next) {
  // console.log("session", req.session);
  // console.log("current user", req.session.user);
  if ( req.session.user ) {
      //res.status(200).json(req.session.user);
      res.status(200).json({msg: "Successful",session:req.session.user});
  }
  else {
      res.status(200).json({msg: "You are not logged in"});
  }
});
 

Router.route('/clothdata').get(function(req,res,next) {
    console.log("cloth");
  //res.status(200).json(req.session.user);
    res.status(200).json({clothData});

});

Router.route('/sportdata').get(function(req,res,next) {
  console.log("sports");
//res.status(200).json(req.session.user);
  res.status(200).json({clothData});

});
 
// This section will help you update task array
Router.route("/update_tasks").post(function (req, res) {
  let db_connect = dbo.getDb(); 
  let username = req.body.username;
  let newTask = req.body.task;
  let myquery = {name:username};
  let newvalues = {   
    $set: {     
      task:newTask 
    }, 
  }
  db_connect.collection("users")
    .findOne(myquery)
    .then(userResponse => {
      if (userResponse != null) {
        db_connect.collection("users")
        .updateOne(myquery,newvalues)
        .then(updateRes =>{
          let modifiedNumber = updateRes.modifiedCount;
          res.json({msg:"Updated record", number:modifiedNumber})
  
        })
        .then(req.session.user.task= newTask)
        .catch(error => {
          let msg = "Error when trying to update record"
          res.status(400).json({ msg: msg, err: "Error" });
          console.log(msg, err);
        })

      } else {
        console.log("api catch username doesn't exist");
        res.status(400).json({ msg: msg, err: "Error" });

    }

    })
    .catch(err => {
        let msg = "Error updating user by username//eariler call"
        res.status(400).json({ msg: msg, err: "Error" });
        console.log(msg, err);
    })

  

});
 
//update images
Router.route("/update_images").post(function (req, res) {
  let db_connect = dbo.getDb(); 
  let username = req.body.username;
  let newImages = req.body.images;
  let myquery = {name:username};
  let newvalues = {   
    $set: {     
      images:newImages 
    }, 
  }
  db_connect.collection("users")
    .findOne(myquery)
    .then(userResponse => {
      if (userResponse != null) {
        db_connect.collection("users")
        .updateOne(myquery,newvalues)
        .then(updateRes =>{
          let modifiedNumber = updateRes.modifiedCount;
          res.json({msg:"Updated-image record", number:modifiedNumber})
  
        })
        .then(req.session.user.images= newImages)
        .catch(error => {
          let msg = "Error when trying to update record"
          res.status(400).json({ msg: msg, err: "Error" });
          console.log(msg, err);
        })

      } else {
        console.log("api catch username doesn't exist");
        res.status(400).json({ msg: msg, err: "Error" });

    }

    })
    .catch(err => {
        let msg = "Error updating user by username//eariler call"
        res.status(400).json({ msg: msg, err: "Error" });
        console.log(msg, err);
    })

  

});
 

Router.route("/getSports/:teamName").post(function (req, res) {
  let teamName = req.params.teamName;
  let teamB =[];

  console.log(CSVresults[0].HomeTeam)
  for (let i in CSVresults) {
    if (CSVresults[i].HomeTeam===teamName && CSVresults[i].FTR==="H" ){
      if (CSVresults[i].AwayTeam in teamB){
        continue
      } else {
        teamB.push(CSVresults[i].AwayTeam)
      }
    }

    if (CSVresults[i].AwayTeam===teamName && CSVresults[i].FTR==="A" ){
      if (CSVresults[i].HomeTeam in teamB){
        continue
      } else {
        teamB.push(CSVresults[i].HomeTeam)
      }
    }

  }

  console.log(teamB)
  res.status(200).json({teamB});
 });


module.exports = Router;