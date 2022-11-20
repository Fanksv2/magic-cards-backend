var express = require("express");
var router = express.Router();
var auth = require("./routes/auth");

router.use("/auth/", auth);

module.exports = router;
