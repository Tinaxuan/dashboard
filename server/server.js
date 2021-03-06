const express = require("express");
const app = express();
const cors = require("cors");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const oneDay = 1000 * 60 * 60 * 24;

//session  and cookie middleware

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: true
}));

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

/////deploy_______
// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});