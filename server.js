var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

var db = require("./models");
var PORT = 3000;
var app = express();

app.use(logger("common"));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static("public"));
require("./routing/apiRoutes.js")(app); 
require("./routing/htmlRoutes.js")(app);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(PORT, function(){
    console.log("Get yourself connected, the writings on port " + PORT);
})