const router = require("express").Router();
const User = require("../model/User");
const Post = require("../model/Post");




//CREATE POST

router.post("/", async (req, res) => {
    // console.log("POST_BODY", req.body)
    const newPost = await new Post(req.body);
    try {
        const savedPost = await newPost.save()
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json(err)
    }
});


router.put("/update/:id", async (req, res) => {

    try {
        // check if post exist before trying to update
        const post = Post.findById(req.params.id);
        if (post) {
            try {
                // since post exist, find by its id and update
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(201).json(updatedPost);

            } catch (err) { }
        } else {
            res.status(401).json('No post with this id');
        }
    } catch (err) {
        res.status(400).json(err)
    }

});

//DELETE POST

router.delete("/delete/:id", async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted");

            } catch (err) { }
        } else {
            res.status(401).json('No post with this id');
        }
    } catch (err) {
        res.status(400).json(err)
    }

});

//GET POST

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET ALL POST
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            });
        } else {
            posts = await Post.find();
        }

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router