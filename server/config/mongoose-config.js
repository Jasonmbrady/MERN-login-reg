const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/vinyl", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then( () => console.log("Establish connection to database!"))
    .catch( err => ("Something went wrong when connecting to the database", err))