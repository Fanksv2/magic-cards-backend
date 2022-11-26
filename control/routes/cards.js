var express = require("express");
var router = express.Router();
const { validateToken } = require("./auth");
const multer = require("multer");
const Card = require("../../models/card");

router.get("/", validateToken, async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ msg: "Name not provided" });
    }

    const cards = await Card.find({
        name: { $regex: name, $options: "i" },
    }).exec();

    if (!cards) {
        return res
            .status(400)
            .json({ error: "No cards were found with this name" });
    }

    res.status(200).json(cards);
});

module.exports = router;
