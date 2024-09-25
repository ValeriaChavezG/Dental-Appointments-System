const Router = require("express");
const { login, register, isAdmin} = require("../controllers/auth");
const { validateJWT } = require("../middlewares/verifyJWT");
const router = Router();

router.post("/Registrate", register);
router.post("/login", login);
router.get("/isAdmin", [validateJWT], isAdmin);
module.exports = router;

