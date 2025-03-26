var jwt = require("jsonwebtoken");

function AuthJWT(req, res, next) {
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userName = decoded.name;
    req.userEmail = decoded.email;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
    return;
  }
}

module.exports = AuthJWT;
