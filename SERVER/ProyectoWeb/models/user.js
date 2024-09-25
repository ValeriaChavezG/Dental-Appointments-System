const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    // id: Number,
    user: String,
    password: String,
    rol: String,
    NombreCompleto: String,
    correoElectronico: String,

    
})

module.exports = mongoose.model("users", userSchema);