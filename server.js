const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// app.use(express.static("public"));
app.use('/public', express.static('public')); // for getting other files 

app.use(bodyParser.urlencoded({
    extended: true
}));


// Creating mongodb server with the help of mongoose
mongoose.connect("mongodb://localhost:27017/cvFeedbackDB", {
    useNewUrlParser: true
});

// Creating mongoose schema
const feedbackSchema = {
    Name: String,
    Email: String,
    Message: String
};

// Creating new model
const Feedback = mongoose.model("Feedback", feedbackSchema);

app.get('/', (req, res) => {

    res.sendFile(__dirname + "/index.html");

});

app.post('/', (req, res) => {

    // Creating new document 
    const feedback = new Feedback({
        Name: req.body.name,
        Email: req.body.email,
        Message: req.body.messg
    });

    // Saving the document to the database
    feedback.save(function (err) {
        if (!err) {
            res.redirect("/");
        }
    });

})

app.listen(3000, function () {
    console.log("Serveris running on port 3000");
});