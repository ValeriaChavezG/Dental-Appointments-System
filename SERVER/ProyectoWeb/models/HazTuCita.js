const mongoose = require("mongoose");

const HazTuCitaSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    NombreCompleto: String,
    Telefono: Number,
    Especialidad: String,
    Fecha: String,
    Hora: String,
    Comentarios: String
})

module.exports = mongoose.model("HazTuCita", HazTuCitaSchema);