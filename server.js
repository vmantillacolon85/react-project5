const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const config = require("./config/key.js")

const { User } = require("./models/user.js");
const { auth } = require("./middleware/auth.js")

mongoose.connect(config.mongoURI,
{useNewUrlParser: true }).then(() =>console.log("DB connected"))
                            .catch(err =>console.error(err));



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());



// app.get('/', (req, res) => {
//     res.send("hello world")
// });

// app.get('/', (req, res) => {
//     res.json({"hello world": "hi there"})
// });

app.get("/api/user/auth", auth, (req, res) =>{
    res.status(200).json({
      _id: req._id,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastName: req.user.lastName,
      role: req.user.role
    })
})

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
    User.findOne({ email: req.body.email }, (error, user) => {
        if(!user)
        return res.join({
            loginSucess: false,
            message: "Authentication failed, email not found"
        });
  //comparePassword
    User.comparePassword(req.body.password, (error, isMatch) => {
        if(!isMatch){
            return res.json({ loginSucess: false, message: "incorrect password"})
        }
    })
  //generateToken
    User.generateToken((error, user) => {
        if(error) return res.status(400).send(error);
        res.cookie("x_auth", user.token)
            .status(200)
            .json({
              loginSucess: true
            })
    })
    })

})



app.listen(5000);
