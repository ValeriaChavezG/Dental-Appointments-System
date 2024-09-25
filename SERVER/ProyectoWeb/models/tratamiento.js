const mongoose = require("mongoose");

const TratamientoSchema = mongoose.Schema({
    id: Number,
    title: String,
    title2: String,
    textTratamiento: String,
    image: String
})

module.exports = mongoose.model("Tratamientos", TratamientoSchema);