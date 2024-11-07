const {
  register,
  login,
  setAvatar,
  getAllUser,
} = require("../controllers/usersController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allusers", getAllUser);
module.exports = router;
