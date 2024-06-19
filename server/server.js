const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const client = new Client({
  connectionString:
    "postgresql://postgres:TfkcIr4kCyXejVhU@furtively-closing-planthopper.data-1.use1.tembo.io:5432/postgres",
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect((err) => {
  if (err) {
    console.error("Could not connect to PostgreSQL", err);
  } else {
    console.log("Connected to PostgreSQL");
  }
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = 1337;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
