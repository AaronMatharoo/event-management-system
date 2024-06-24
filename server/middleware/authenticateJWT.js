//import jwt module
const jwt = require("jsonwebtoken");

//hardcoded INTETIONALLY for examiners convenience
const SECRET_KEY =
  "8ccad7473bb652db6fe94192e4c11ea68f96b871158db87e38ec58d565bd6451cf5d370b3aaf06d5f643af801af27acf5fee425721d74103226a293b0478c50d";

//middleware to authenticate jwt tokens
const authenticateJWT = (req, res, next) => {
  //extract token from auth header
  const token = req.headers.authorization;

  //if token exists
  if (token) {
    //verify token using secret key
    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
      //send forbidden status if it fails
      if (err) {
        return res.sendStatus(403);
      }
      //if it succeeds, set user then call next middleware
      req.user = user;
      next();
    });
  } else {
    //if no token, send unauthorized status
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
