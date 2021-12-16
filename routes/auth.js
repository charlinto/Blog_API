const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");




// REGISTER

router.post("/register", async (req, res) => {
    try {
        console.log("REQ_BODY", req.body)
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save()
        res.status(201).json();
      
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong credentials");

        const validation = await bcrypt.compare(req.body.password, user.password);
        !validation && res.status(400).json("Wrong credentials");

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router