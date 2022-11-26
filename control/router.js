var express = require("express");
var router = express.Router();
var { auth } = require("./routes/auth");
var admin = require("./routes/admin");
var cards = require("./routes/cards");

router.use("/auth/", auth);
router.use("/admin/", admin);
router.use("/cards/", cards);

module.exports = router;
