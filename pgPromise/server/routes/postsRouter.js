const express = require("express");
// const pgp = require("pg-promise")();
// const connectionString = "postgress://localhost:5432/practice";
// const db = pgp(connectionString);
const userRouter = require("./userRouter.js");
const db = userRouter.db;

const router = express.Router();

router.get("/likes", (req, res) => {
    db.any('SELECT * FROM userLikes')
    .then((rows) => {
        res.json(rows);
    })
    .catch ((error) => {
        console.log(error)
    })
})

router.get("/all", (req, res) => {
    db.any('SELECT * FROM posts')
    .then((rows) => {
        res.json(rows);
    })
    .catch ((error) => {
        console.log(error)
    })
})

router.get("/:user_id", (req, res) => {
    let userID = req.params.user_id;

    db.any(`SELECT * FROM posts WHERE poster_id = ${userID}`)
    .then((rows) => {
        res.json(rows);
    })
    .catch ((error) => {
        console.log(error)
    })
})



router.post("/register", async (req, res) => {
    try {
    let insertQuery = "INSERT INTO posts(poster_id, body) VALUES($1, $2)"
        await db.none(insertQuery, [req.body.poster_id, req.body.body])
        res.json({
            payload: req.body,
            message: "Post registered"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "Something went wrong registering the post"
        })
    }
})



module.exports = router;