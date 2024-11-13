const {
  register,
  login,
  setAvatar,
  getAllUser,
  deleteUser,
} = require("../controllers/usersController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allusers", getAllUser);
router.delete("/deleteuser/:id", deleteUser);
module.exports = router;
