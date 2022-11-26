var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { validateToken } = require("./auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var path = require("path");
var fs = require("fs");
const Card = require("../../models/card");

router.post("/", validateToken, upload.single("image"), (req, res) => {
    const newCard = new Card({
        name: req.body.name,
    });

    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, `../../public/${newCard._id}.png`);

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
        fs.rename(tempPath, targetPath, (err) => {
            if (err) return handleError(err, res);

            newCard.save();

            res.status(200).contentType("text/plain").end("File uploaded!");
        });
    } else {
        fs.unlink(tempPath, (err) => {
            if (err) return handleError(err, res);

            res.status(403)
                .contentType("text/plain")
                .end("Only .png files are allowed!");
        });
    }
});

module.exports = router;
