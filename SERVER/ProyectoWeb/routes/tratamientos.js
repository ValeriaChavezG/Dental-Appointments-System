const {Router} = require('express');
const { getAllTratamientos, getTratamientobyId, createTratamiento, updateTratamiento, deleteTratamiento, getTratamientoDetail } = require('../controllers/tratamientos');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdmiRole } = require('../middlewares/verifyAdmiRole');
const router = Router();
router.get("/", getAllTratamientos);
router.get("/:id?", getTratamientobyId);
router.post("/", createTratamiento);
router.put("/:id?",  updateTratamiento);
router.get('/details/:id', getTratamientoDetail);
router.delete("/:id",  deleteTratamiento);

// router.get("/", getAllTratamientos);
// router.get("/:id",[validateJWT, verifyAdmiRole], getTratamientobyId);
// router.post("/", [validateJWT, verifyAdmiRole], createTratamiento);
// router.put("/:id", [validateJWT, verifyAdmiRole], updateTratamiento);
// router.delete("/:id", [validateJWT, verifyAdmiRole], deleteTratamiento);

module.exports =router;
// router.get("/", [validateJWT], getAllTratamientos);
// router.get("/:id", [validateJWT, verifyAdmiRole], getTratamientobyId);
// router.post("/", createTratamiento);

// router.put("/:id", updateTratamiento);
// router.delete("/:id", deleteTratamiento);