const {Router} = require("express");
const { usersGet, userPost, userDelete, userPut, userPatch } = require("../controllers/users");
const router = Router();

router.get("/", usersGet);


router.post("/:id", userPost);

router.delete("/:id", userDelete);

router.put("/:id", userPut);

router.patch("/", userPatch);


module.exports = router;

