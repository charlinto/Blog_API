const router = require("express").Router();
const Category = require("../model/Category");




//CREATE Category
router.post("/", async (req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save()
        res.status(200).json(savedCat);
    } catch (err) {
        res.status(500).json(err);
    }
});

//CREATE Category
router.get("/", async (req, res) => {
    try {
        const Cats = await Category.find();
        res.status(200).json(Cats);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router