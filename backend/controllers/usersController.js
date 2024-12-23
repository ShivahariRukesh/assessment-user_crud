const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  const { username, email, password, avatarImage, gender } = req.body;

  try {
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ message: "Username already used", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ message: "Email already used", status: false });

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
      return res.json({ message: "Your email is incorrect", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ message: "Your password is incorrect", status: false });
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

module.exports.editUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.body.username, req.body.email, req.body.gender);

    const user = await User.updateOne(
      { _id: id },
      {
        $set: {
          email: req.body.email,
          username: req.body.username,
          gender: req.body.gender,
        },
      }
    );
    if (user) {
      return res.json({ status: true, message: "Successfully edited a user" });
    }
  } catch (err) {
    next("Error in edit user", err);
  }
};
