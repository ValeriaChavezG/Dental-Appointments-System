const {response, request} = require("express");
const HazTuCitaList =[];
const tratamiento = require("../models/tratamiento");
const HazTuCita = require("../models/HazTuCita");


const getAllCitas = (req = request, res = response) => {

  const { searchTerm } = req.query;
  

  HazTuCita.find({title: RegExp(searchTerm)}).then(
    (result) =>{
      res.status(200).json({
        HazTuCitaList : result,
      });
    }
  ).catch(
    (error)=>{
      res.status(500).json({
        msg: "Error al obtener los datos"
      });
    }
  )

}
const getTodasCitas = (req = request, res = response) => {
    HazTuCita.find().then(
      (result) => {
        res.status(200).json({
          todasCitas: result,
        });
      }
    ).catch(
      (error) => {
        res.status(500).json({
          msg: "Error al obtener todas las citas"
        });
      }
    );
  }

  
const getCitaId = (req = request, res = response) => {
  const id = parseInt(req.params.id);
  HazTuCita.findOne({id : id}).then(
    (result)=> {
      res.status(200).json({
        HazTuCita : result 
      });
    }
  ).catch(
    (error) =>{
      res.status(500).json({
        msg: "Error al obtener los datos"
      });
    }
  )
} 
const createCita = (req = request, res = response) => {
    const { NombreCompleto, Telefono, Especialidad, Fecha, Hora, Comentarios } = req.body;
  
    if (!NombreCompleto || !Telefono || !Especialidad || !Fecha || !Hora || !Comentarios) {
      res.status(400).json({
        msg: 'Datos invalidos'
      });
      return;
    }
  
    const newHazTuCita = new HazTuCita({
      NombreCompleto,
      Telefono,
      Especialidad,
      Fecha,
      Hora,
      Comentarios
    });
  
    newHazTuCita.save()
      .then((result) => {
        res.status(200).json({
          msg: 'Elemento insertado con éxito'
        });
      })
      .catch((error) => {
        res.status(500).json({
          msg: 'Error al insertar el elemento'
        });
      });
  };
const checkDisponibility = (req = request, res = response) => {
    const { fecha, hora } = req.query;
  
    HazTuCita.findOne({ Fecha: fecha, Hora: hora })
      .then((result) => {
        if (result) {
          res.status(200).json({
            isAvailable: false,
            message: 'Cita no disponible, horario ocupado.'
          });
        } else {
          res.status(200).json({
            isAvailable: true,
            message: 'Horario disponible para agendar cita.'
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          msg: 'Error al verificar disponibilidad.'
        });
      });
  };

const checkDisponibilityHelper = async (Fecha, Hora) => {
    try {
      const result = await HazTuCita.findOne({ Fecha: Fecha, Hora: Hora });
      return !result; // Devuelve true si el horario está disponible
    } catch (error) {
      throw error;
    }
  };

  const deleteCita = (req = request, res = response) => {
    const id = req.params.id;
  
    // Utiliza ObjectId para buscar por _id
    const mongoose = require("mongoose");
    const objectId = mongoose.Types.ObjectId;
    const query = { _id: new objectId(id) };
  
    HazTuCita.deleteOne(query).then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({
          msg: "Elemento eliminado con éxito"
        });
      } else {
        res.status(404).json({
          msg: "No se encontró ningún elemento para eliminar"
        });
      }
    }).catch((error) => {
      res.status(500).json({
        msg: "Error al eliminar el elemento",
        error: error.message  // Puedes enviar el mensaje de error para debugging
      });
    });
  };


module.exports = {
    getAllCitas,
    getTodasCitas,
    getCitaId,
    createCita,
    // updateCita,
    deleteCita,
    checkDisponibility,
    checkDisponibilityHelper
}