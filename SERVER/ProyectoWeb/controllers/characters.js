const {response, request} = require("express");

const charactersList =[];
const Character = require("../models/character");

const getAllCharacters = (req = request, res = response) => {

  const { searchTerm } = req.query;

  Character.find({title: RegExp(searchTerm)}).then(
    (result) =>{
      res.status(200).json({
        charactersList : result
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
const getCharacterbyId = (req = request, res = response) => {
  const id = req.params.id;
  Character.findOne({id : id}).then(
    (result)=> {
      res.status(200).json({
        character : result 
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
const createCharacter = (req = request, res = response) => {
   const {title, image, id} = req.body;

   if(!title || !image || !id){
    res.status(400).json({
      msg: "Datos invalidos"
    });
    return;
   }
   const newCharacter = Character({
     title,
     image,
     id
   });
   newCharacter.save().then(
    (result)=> {
      res.status(200).json({
        msg: "Elemento insertado con éxito"
      });
    }
   ).catch(
    (error) => {
      res.status(500).json({
        msg: "Error al insertar el elemento"
      });
    }
   )
}
const updateCharacter= (req = request, res = response) =>{
  const id = req.params.id;
  const {title} = req.body;
  Character.updateOne({id : id }, {title : title}).then((result)=>{
    res.status(200).json({
      msg: "Elemento actualizado con éxito"
    });
  }).catch((error)=>{
    res.status(200).json({
      msg: "Error al actualizar el elemento"
    });
  })
}
const deleteCharacter= (req = request, res = response) =>{
  const id = req.params.id;
  Character.deleteOne({id : id}).then((result)=>{
    res.status(200).json({
      msg: "Elemento eliminado con éxito"
    });
  }
  ).catch((error)=>{
    res.status(500).json({
      msg: "Error al eliminar el elemento"
    });
  })
}

module.exports = {
    getAllCharacters,
    getCharacterbyId,
    createCharacter,
    updateCharacter,
    deleteCharacter
}