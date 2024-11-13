const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  const { username, email, password, avatarImage, gender } = req.body;

  try {
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      avatarImage,
      gender,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ msg: "Your email is incorrect", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Your password is incorrect", status: false });
    }
    delete user.password;

    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({}).select([
      "email",
      "username",
      "avatarImage",
      "gender",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (user) {
      return res.json({ status: true, message: "Successful deleted a user" });
    }
  } catch (err) {
    next("Error in delete user", err);
  }
};
