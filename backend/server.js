const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOption = {
    // Enable CORS just for this origin
    origin: 'http://localhost:8081'
};

app.use(cors(corsOption));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to legermano application." });
});

// Routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serve is running on port ${PORT}`);
});