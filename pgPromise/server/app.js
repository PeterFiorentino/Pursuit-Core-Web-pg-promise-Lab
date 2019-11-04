const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({
    extended: false
}))

app.use(express.json());

//Routes
const usersRouter = require(`./routes/userRouter.js`);
const usersRouterDB = usersRouter.router;
app.use("/users", usersRouterDB)

const postsRouter = require(`./routes/postsRouter.js`);
app.use("/posts", postsRouter);


app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
})