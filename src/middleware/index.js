const bcrypt = require("bcryptjs");
const User = require("../user/user.model");
const jwt = require("jsonwebtoken")

exports.hashPassword = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    next();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Check server logs. Error while hashing password" });
  }
};

exports.comparePasswords = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const comparisonBool = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (comparisonBool) {
      req.user = user;
      next();
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Check server logs. Error while comparing passwords" });
  }
};

exports.tokenAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const tokenObj = jwt.verify(token, process.env.SECRET)
    const user = await User.findOne({_id: tokenObj._id})
    req.user = user

    if (!req.user) {
      throw new Error({message: "error"})
    }
    next()
  }catch(err){
    console.log(err)
    res.status(500).send({message: "Check server logs. Issue with token auth"})
  }
}