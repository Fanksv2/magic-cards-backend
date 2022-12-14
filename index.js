const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./control/router");
const path = require("path");
const bodyParser = require("body-parser");

dotenv.config();

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
// app.use(
//     express.urlencoded({
//         extended: true,
//         limit: "50mb",
//         parameterLimit: 1000000,
//     })
// );

app.use("/", router);
app.use(express.static(path.join(__dirname + "/public")));

const mongoose = require("mongoose");
const mongoDB = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.utsottw.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Port: ${port}`);
}).on("error", (err) => {
    console.log(err);
});
