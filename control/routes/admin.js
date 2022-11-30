var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { validateToken } = require("./auth");
const multer = require("multer");
var path = require("path");
var fs = require("fs");
const Card = require("../../models/card");
const fetch = require("node-fetch");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", validateToken, upload.single("image"), (req, res) => {
    fetch(`${process.env.FILESTACK_URL_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "image/png" },
        body: req.file.buffer,
    })
        .then((r) => r.json())
        .then(
            async (resFile) => {
                const newCard = new Card({
                    name: req.body.name,
                    url: resFile.url,
                });

                newCard.save();

                return res.status(200).json({ msg: "Created with success" });
            },
            (err) => {
                return res.status(500).json({ msg: "Fail to save image" });
            }
        );
});

module.exports = router;
