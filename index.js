const express = require('express')
const app = express()
const mongoose = require("mongoose")
const { DB } = require('./variables')
const { PORT } = require('./variables')
const fs = require('fs');
const { Movie } = require('./models/movies')
const bodyParser = require('body-parser');
const api= require("./api")

app.listen(PORT, () => {
    console.log(`connected at ${PORT}`);
})

app.use(bodyParser.json());
app.use("/api", api)



mongoose.connect(DB, { autoCreate: true })
    .then(() => {
        console.log("Connected to Database!");
        // importData()
    })
    .catch((error) => {
        console.log("Not connected to Database!");
        console.log(error);
    })


