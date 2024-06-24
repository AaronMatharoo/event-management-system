const express = require("express");
//import jsonwebtoken module for jwt functionality
const jwt = require("jsonwebtoken");
const router = express.Router();
const pool = require("../db");

//endpoint handling user login
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    //check if the user exists in the database
    const user = await pool.query(
      `SELECT * FROM users WHERE username = $1 AND password = $2`,
      [username, password]
    );

    //if no user found, return error
    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // user is authenticated successfully and generate JWT token
    const token = jwt.sign(
      { username: user.rows[0].username },
      //HARDCODED jwt secret key INTENTIONALLY for examiners convenience
      "8ccad7473bb652db6fe94192e4c11ea68f96b871158db87e38ec58d565bd6451cf5d370b3aaf06d5f643af801af27acf5fee425721d74103226a293b0478c50d"
    );
    //return the token in response
    res.json({ token });
    //then handle possible errors
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
