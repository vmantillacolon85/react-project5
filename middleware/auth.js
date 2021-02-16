const { User } = require("../models/user.js");

let auth = (req, res, next) => {
    let token = req.cookies.x_auth;

    User.findByToken(token, (error, userData) =>{
        if(error) throw error;
        if(!user) return res.json({
            isAuth: false,
            error: true
        });
      req.token = token;
      req.user = user;
      next();
    })

}


module.exports = { auth };
