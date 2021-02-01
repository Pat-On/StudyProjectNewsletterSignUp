const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");


const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.post("/", function(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email
  console.log(email)
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/e19e417b0a";
  const option = {
    method: "POST",
    auth: "Paton30:8bb6b98e01fd3ead9b2c53c025e8d8d7-us7"
  }
  const request = https.request(url, option, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});

//redirecting nice!
app.post("/failure", function(req, res) {
  res.redirect("/")
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server works on port 3000");
});