const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const config = require("./config/key.js")

const { User } = require("./models/user.js");

mongoose.connect(config.mongoURI,
{useNewUrlParser: true }).then(() =>console.log("DB connected"))
                            .catch(err =>console.error(err));



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



// app.get('/', (req, res) => {
//     res.send("hello world")
// });

app.get('/', (req, res) => {
    res.json({"hello world": "hi bitch"})
});



app.post("/api/users/register", (req, res) => {
    const user = new User(req.body)

    user.save((error, userData) => {
        if (error) return res.json ({ success: false, error })
        return res.status(200).json({
            success: true
        })
    })
});

app.post("/api/user/login", (req, res) => {
  //find the email

  //comparePassword

  //generateToken
})



app.listen(5000);
