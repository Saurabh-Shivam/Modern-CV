const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// app.use(express.static("public"));
app.use('/public', express.static('public')); // for getting other files 

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {

    res.sendFile(__dirname + "/index.html");

});

app.listen(3000, function () {
    console.log("Serveris running on port 3000");
});