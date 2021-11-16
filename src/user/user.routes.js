const { Router } = require("express")
const { addUser, find, deleteItem, login } = require("./user.controllers")
const { hashPassword, comparePasswords, tokenAuth } = require("../middleware/index")
const userRouter = Router();

userRouter.post("/user", hashPassword, addUser) // Works
userRouter.get("/find", find) // Works
userRouter.post("/delete", deleteItem)
userRouter.post("/login", comparePasswords, login) // Works 

userRouter.get("/token", tokenAuth, login)
module.exports = userRouter