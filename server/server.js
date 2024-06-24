const express = require("express");
const cors = require("cors");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const eventsRoute = require("./routes/events");
const authenticateJWT = require("./middleware/authenticateJWT");

//create express instance
const app = express();
//CORS to allow cross-origin requests
app.use(cors());
//parse incoming requests with JSON
app.use(express.json());

//define routes
app.use("/register", registerRoute);
app.use("/login", loginRoute);
//events endpoint is protected with JWT Auth
app.use("/events", authenticateJWT, eventsRoute);

const PORT = 1337;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
