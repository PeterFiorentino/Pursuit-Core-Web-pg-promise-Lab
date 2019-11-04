const express = require("express");
const pgp = require("pg-promise")(); //Import pg-promise
const connectionString = "postgress://localhost:5432/practice";//URL where postgress is running
const db = pgp(connectionString);//connected to db

const router = express.Router();

router.get("/all", (req, res) => {
    // ES 5:
    db.any("SELECT * FROM users")
    .then((rows) => {
        console.log(rows)
        res.json(rows)
    })
    .catch((error) => {
        console.log(error)
    })
    // res.send("This is /users");

    // ES 6: also needs "async" before (req, res)
    // try {
    //     let users = await db.one("SELECT * FROM users")
    //     res.json(users);
    // } catch (error) {
    //     console.log(error);
    // }
})

router.post("/register", async (req, res) => {
    try {
    let insertQuery = "INSERT INTO users(firstname, lastname, age) VALUES($1, $2, $3)"
        await db.none(insertQuery, [req.body.firstname, req.body.lastname, req.body.age])
        res.json({
            payload: req.body,
            message: "User registered"
        })
    } catch (error) {
        res.json({
            message: "Something went wrong registering the user"
        })
    }
})

module.exports = {
    router: router,
    db: db
}