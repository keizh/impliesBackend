const UserRouter = require(`express`).Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

UserRouter.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 5);
    // creating new user
    const newUser = new UserModel({ name, email, password: hashedPassword });
    const newUserCreated = await newUser.save();
    if (newUserCreated) {
      res.status(201).json({ message: "new user created", success: true });
      return;
    } else {
      res.status(401).json({ message: "new user created", success: false });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: "failed user creation", success: false });
    return;
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email }).lean();
    if (user) {
      let result = bcrypt.compareSync(password, user.password);
      if (result) {
        let JWT = jwt.sign(
          {
            name: user.name,
            email: user.email,
            userId: user._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "12h" }
        );
        console.log(JWT);
        res
          .status(200)
          .json({ message: "successfull login", JWT, success: true });
        return;
      } else {
        res.status(401).json({ message: "wrong password", success: false });
        return;
      }
    } else {
      res.status(404).json({ message: "email not registered", success: false });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
});

UserRouter.post("/JWT", async (req, res) => {
  const { token } = req.body;
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    res.status(200).json({ success: true });
    return;
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
    return;
  }
});

module.exports = UserRouter;
