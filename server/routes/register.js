const express = require("express");
//create router instance
const router = express.Router();
const pool = require("../db");

//endpoint handling user registration
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    //check if username exists in database
    const userExists = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    //if username already exists, return error (they should be logging in)
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    } else {
      //if username doesnt exist, insert new user to user table
      const newUser = await pool.query(
        `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
        [username, password]
      );
    }
    //return success message when registration is successful
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    //handle errors
    console.error("Registration failed:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

module.exports = router;
