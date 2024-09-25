const express =require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const {default: mongoose, connection } = require ("mongoose");

class Server{

    constructor(){
        this.app= express();
        this.port =process.env.PORT;
        this.connection_string = process.env.CONNECTION_STRING;
        this.tratamiento ="/api/Tratamientos"
        this.authPath = "/api/auth";
        this.usersPath ="/api/users";
        this.cita = "/api/HazTuCita";
        this.middleware();
        this.routes();
        this.db();
    }

    routes(){
        this.app.use(this.authPath, require("../routes/auth"));
        this.app.use(this.usersPath, require("../routes/users"));
        this.app.use(this.tratamiento, require("../routes/tratamientos"));
        // this.app.use(this.tratamiento, require("../routes/Tratamientos"));
        this.app.use(this.cita, require("../routes/HazTuCIta"));

    }
    middleware(){
         this.app.use(express.json());
         this.app.use(cors());
     }
     db(){
         mongoose.connect(this.connection_string).then(
             ()=>{
                 console.log("Conexión exitosa con la db");
             }
         ).catch(
             (error)=>{
                console.log("Error al conectar con la db");
                 console.log(error);
             }
         )
     }
    listen(){
        this.app.listen(this.port, ()=>{
        console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;