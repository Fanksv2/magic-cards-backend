var express = require("express");
var router = express.Router();

router.post("/register", (req, res) => {
    console.log(req.body);
});

module.exports = router;
