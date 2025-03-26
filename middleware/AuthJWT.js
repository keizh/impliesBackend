var jwt = require("jsonwebtoken");

function AuthJWT(req, res, next) {
  const { authorization } = req.headers;
  console.log(`req.headers`, req.headers);
  if (authorization) {
    try {
      var decoded = jwt.verify(authorization, process.env.JWT_SECRET);
      console.log(`Auth JWT --->`, decoded);
      req.userId = decoded.userId;
      req.userName = decoded.name;
      req.userEmail = decoded.email;
      next();
    } catch (err) {
      res.status(401).json({ success: false, message: "JWT_ISSUE" });
      return;
    }
  } else {
    res.status(401).json({ success: false, message: "JWT_ISSUE" });
    return;
  }
}

module.exports = AuthJWT;
