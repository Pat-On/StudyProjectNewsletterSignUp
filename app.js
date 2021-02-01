const express = require("express");
const bodyParser = require("body-parser");
// const https = require("https");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})


app.listen(3000, function() {
  console.log("Server works on port 3000")
})