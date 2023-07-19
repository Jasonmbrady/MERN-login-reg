const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');

app.use(
    cookieParser(),
    cors({credentials: true, origin: 'http://localhost:3000'}),
    express.json(), 
    express.urlencoded({extended: true})
    );
// const secretKey = process.env.SECRET_KEY;

// Mongoose Config
require("./config/mongoose-config");
//Routes
require("./routes/userroutes")(app);

app.listen(8000, () => console.log("Server running on port 8000"));