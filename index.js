const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./control/router");

dotenv.config();

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Port: ${port}`);
});
