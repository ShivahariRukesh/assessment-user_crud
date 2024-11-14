const {
  register,
  login,
  setAvatar,
  getAllUser,
  deleteUser,
  editUser,
} = require("../controllers/usersController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allusers", getAllUser);
router.delete("/deleteuser/:id", deleteUser);
router.put("/edituser/:id", editUser);
module.exports = router;
