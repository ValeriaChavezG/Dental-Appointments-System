const {Router} = require('express');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdmiRole } = require('../middlewares/verifyAdmiRole');
const { getAllCitas, getCitaId, createCita, deleteCita, checkDisponibility, getTodasCitas } = require('../controllers/HazTuCita');
const router = Router();
router.get("/", [validateJWT],getAllCitas);
router.get("/obtener", getTodasCitas);
router.get("/checkDisponibility", checkDisponibility);
router.post("/", createCita);
router.delete("/obtener/:id?",  deleteCita);

module.exports =router;