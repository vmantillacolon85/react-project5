const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { User } = require("./models/user.js");
mongoose.connect('mongodb+srv://javier85:Colon1948!!@react-project.iilfr.mongodb.net/project5?retryWrites=true&w=majority',
{useNewUrlParser: true }).then(() =>console.log("DB connected"))
                            .catch(err =>console.error(err));



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send("hello world")
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




app.listen(5000);
