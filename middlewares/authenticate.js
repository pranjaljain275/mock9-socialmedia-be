require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenicate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decoded = jwt.verify(token, process.env.key);
      if (decoded) {
        const userId = decoded.userId;
        req.body.user = userId;
        next();
      } else {
        res.send({ message: "Login First" });
      }
    } else {
      res.send({ message: "Login First" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: err.message });
  }
};

module.exports = {
  authenicate,
};
