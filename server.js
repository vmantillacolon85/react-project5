const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://javier85:Colon1948!!@react-project.iilfr.mongodb.net/project5?retryWrites=true&w=majority',
{useNewUrlParser: true }).then(() =>console.log("DB connected"))
                            .catch(err =>console.error(err));

app.get('/', (req, res) => {
    res.send("hello world")
});



app.listen(5000);
