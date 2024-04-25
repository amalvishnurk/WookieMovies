const express = require('express')
const app = express()
const mongoose = require("mongoose")
const { DB } = require('./variables')
const { PORT } = require('./variables')
const bodyParser = require('body-parser');
const api= require("./api")
const cors= require('cors')

app.listen(PORT, () => {
    console.log(`connected at ${PORT}`);
})

app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:3000']
}))
app.use("/api", api)




mongoose.connect(DB, { autoCreate: true })
    .then(() => {
        console.log("Connected to Database!");
    })
    .catch((error) => {
        console.log("Not connected to Database!");
        console.log(error);
    })


