var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(express.urlencoded({ extended: true })) //optional but useful for url encoded data

const oneDay = 1000 * 60 * 60 * 24;
//session  and cookie middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}))
app.use(cookieParser());


app.use('/user/current', function(req,res,next) {
    console.log("session", req.session);
    console.log("current user", req.session.user);
    if ( req.session.user ) {
        //res.status(200).json(req.session.user);
        res.status(200).json({"msg": "Successful","session":req.session});
    }
    else {
        res.status(200).json({"msg": "You are not logged in"});
    }
});

app.get('/logout', function(req,res,next) {
    req.session.destroy();
    res.status(200).json({"msg": "You have logged out now"})
    console.log("logout success");
    res.redirect('/home.html');
});


const API_PORT = 32741;

const { url } = require('inspector');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/dashboard_users", function(err){
    if(err){

    }
});

const UserSchema = new mongoose.Schema({
    name:String,
    password:String,
    images:{
        image:{
            address:{type:String,default:url},
        }
    },
    tasks:{
        task_id:Number,
        task_content:String,
        task_finish:Boolean
    }
});

const User = moogoose.model("dashboard_user",UserSchema);

app.listen(API_PORT,() => console.log(`Listening on localhost: ${API_PORT}`));