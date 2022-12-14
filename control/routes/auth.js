var express = require("express");
var router = express.Router();
var User = require("../../models/user");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const { name, email, password, admin } = req.body;
    if (!name || !email || !password || admin == null) {
        return res.status(400).json({ error: "Missing some fields" });
    }

    const userAlreadyExists = await User.findOne({ email }).exec();

    if (userAlreadyExists) {
        return res.status(400).json({ error: "User already registered" });
    }

    const newUser = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 8),
        admin,
    });

    newUser.save();

    res.status(200).json({ msg: "Registered with success" });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Missing some fields" });
    }

    const user = await User.findOne({ email }).exec();

    if (!user) {
        return res.status(400).json({ error: "User do not exists" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.status(200).json({ name: user.name, admin: user.admin, token });
});

router.get("/user", validateToken, async (req, res) => {
    const user = await User.findOne({ _id: req.userId }).exec();

    res.status(200).json({
        name: user.name,
        admin: user.admin,
    });
});

function validateToken(req, res, next) {
    const token = req.headers.auth;
    if (!token) {
        return res.status(400).json({ error: "Not authenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
        if (err) return res.status(400).json({ error: "Not authenticated" });

        req.token = token;
        req.userId = decoded.id;
        next();
    });
}

module.exports = { auth: router, validateToken };
