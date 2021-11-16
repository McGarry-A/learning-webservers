require("./db/connection");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000
const app = express();
const userRouter = require("./user/user.routes")

// Converts everything that we recieve to JS Objects, and then everything we send
// back to JSON data.
app.use(express.json())
app.use(cors())
app.use(userRouter)

app.get("/health", (req,res) => {
    res.send({message: "Server is up"})
})

app.listen(port, () => {
    console.log(`listenting on ${port}`)
});