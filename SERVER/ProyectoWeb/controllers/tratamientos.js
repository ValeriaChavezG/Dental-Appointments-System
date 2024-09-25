const {response, request} = require("express");
const TratamientoList =[];
const tratamiento = require("../models/tratamiento");


const getAllTratamientos = (req = request, res = response) => {

  const { searchTerm } = req.query;
  

  tratamiento.find({title: RegExp(searchTerm)}).then(
    (result) =>{
      res.status(200).json({
        TratamientoList : result,
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
const getTratamientobyId = (req = request, res = response) => {
  const id = parseInt(req.params.id);
  tratamiento.findOne({id : id}).then(
    (result)=> {
      res.status(200).json({
        tratamiento : result 
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
const createTratamiento = (req = request, res = response) => {
   const {title, title2, textTratamiento, image, id} = req.body;

   if(!title || !title2 || !textTratamiento || !image || !id){
    res.status(400).json({
      msg: "Datos invalidos"
    });
    return;
   }
   const newTratamiento = tratamiento({
     title,
     title2,
     textTratamiento,
     image,
     id
   });
   newTratamiento.save().then(
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
const updateTratamiento= (req = request, res = response) =>{
  // const id = req.params.id;
  const {id,title, title2,textTratamiento,image} = req.body;
  if(!title || !title2 || !textTratamiento || !image){
    res.status(400).json({
        msg: "Faltan datos"
    });
    return;
}
tratamiento.findOne({id:id}).then(
  (result)=>{
    if(result){
      result.title = title;
      result.title2= title2;
      result.textTratamiento = textTratamiento;
      result.image = image;
    result.save().then(
      (result)=>{
        res.status(200).json({
          // tratamiento: result
          msg: "Tratamiento actualizada"
        });
      }
    ).catch(
      (error)=>{
      res.status(200).json({
        msg: "Error al actualizar el elemento"
      });
    }
    );
    }else{
      res.status(404).json({
          msg: "No se encontró el tratamiento"
      });
    }
  }
).catch(
  (error) => {
      res.status(500).json({
          msg: "Error al actualizar el tratamiento",
          error
      });
  }
);

  // tratamiento.updateOne({id : id }, {title : title}, {title2 : title2}, {textTratamiento : textTratamiento},{image : image} ).then((result)=>{
  //   res.status(200).json({
  //     msg: "Elemento actualizado con éxito"
  //   });
  // })

}
const deleteTratamiento= (req = request, res = response) =>{
  const id = req.params.id;
  tratamiento.deleteOne({id : id}).then((result)=>{
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
const getTratamientoDetail = async (req = request, res= response) => {
  try {
      const id = parseInt(req.params.id);

      const tratamientoSearch = await tratamiento.findOne({ id: id });

      if (tratamientoSearch) {
          res.status(200).json(tratamientoSearch);
      } else {
          res.status(404).json({ message: "Tratamiento not found" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
    getAllTratamientos,
    getTratamientobyId,
    createTratamiento,
    updateTratamiento,
    deleteTratamiento,
    getTratamientoDetail
}
  // {
    //     "id": 1,
    //     "title": "Brackets",
    //     "title2": "Tratamiento",
    //     "textTratamiento": "La ortodoncia moderna puede enderezar los dientes en menor tiempo de tratamiento. Y ofrecer opciones que van desde la ortodoncia tradicional y las opciones de brackets estéticos, llegando a los alineadores transparentes que pueden llegar a ser prácticamente indetectables a la vista. Sí quieres que tu sonrisa brille, comunícate con nosotros para poder ofrecerte la mejor opción para tu caso y acercarte a tu mejor sonnrisa",
    //     "image": "https://estudidentalbarcelona.com/wp-content/uploads/2017/04/tipos-de-brackets.jpg",
    //   },
    //   {
    //     "id": 2,
    //     "title": "Implantes",
    //     "title2": "Tratamiento",
    //     "textTratamiento": "Los implantes dentales son la solución más natural, duradera y con la mejor funcionalidad que existe en la actualidad cuando se propone la restitución de uno, varios o incluso todos los dientes. El material del cual se confeccionan los implantes dentales es completamente inerte, lo que permite su adherencia al cuerpo sin riesgo de reacciones alérgicas.",
    //     "image": "https://www.dentaltix.com/es/sites/default/files/como-cuidar-implantes-dentales.jpg",
    //   },
    //   {
    //     "id": 3,
    //     "title": "Endodoncia",
    //     "title2": "Tratamiento",
    //     "textTratamiento": "Dentro de cada diente hay una cámara central de la que se proyectan uno o varios conductos que recorren la longitud de la o las raíces de los dientes que contienen vasos y nervios. Cuando por diferentes causas el contenido de estos se ve afectado es necesario la terapia de conductos o endodoncia. Esta terapia es una forma de prevenir la extracción, o que en el caso de infecciones las mismas avancen, permitiendo junto con su restauración, conservar las funciones de el o los dientes afectados.",
    //     "image": "https://www.clinicastoma.com/wp-content/uploads/2014/11/2254-clinica-dental-stoma-alcorcon-y-mostoles-endodoncia-1.jpg",
    //   },
    //   {
    //     "id": 4,
    //     "title": "Periodoncia",
    //     "title2": "Tratamiento",
    //     "textTratamiento": "En Smylife ofrecemos una amplia gama de servicios de terapia periodontal para abordar varias etapas de la enfermedad de las encías. La enfermedad de las encías es una de las principales causas de la pérdida de dientes en adultos ya que uno de sus grandes inconvenientes es la falta absoluta de dolor hasta las etapas más avanzadas de la enfermedad. Cuando no se trata la enfermedad de las encías puede aumentar su riesgo de desarrollar problemas graves de salud bucal que pueden afectar la función, la apariencia y la salud de su sonrisa. Mantener encías saludables ayuda a tener una mejor salud.",
    //     "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYe57L4ONvat44qnoQ8caIyGu3JWy3iB6O72SDPVTD3KgM0JNOmNToupGVXKyI-OY9ktw&usqp=CAU",
    //   },
    //   {
    //     "id": 5,
    //     "title": "Prevencion",
    //     "title2": "Tratamiento",
    //     "textTratamiento": "La prevención en cualquier área de la salud es la primera opción de tratamiento, es más barata, indolora y permite conservar un buen estado de salud general. Además de esto, según diversos estudios una buena higiene bucal es indispensable para mantener el estado de salud general.",
    //     "image": "https://gacetadental.com/wp-content/uploads/2009/04/Posiciones-y-posturas-de-trabajo-del-odontologo-y-del-auxiliar.jpg",
    //   },
    //   {
    //     "id": 6,
    //     "title": "Blanqueamiento",
    //     "title2": "Tratamiento",
    //     "textTratamiento": "Tu mejor accesorio… Nada brinda ese extra como una sonrisa blanca y brillante. Sí hablamos de blanqueamiento, existen diferentes opciones que permiten realzar ese bello color aperlado natural de tus dientes, que van desde productos aplicados por el profesional a los que podrás colocar en caso con evidentes resultados.",
    //     "image": "https://cdcssl.ibsrv.net/cimg/www.officitedeardoctorspanish.smb/900x900_85/201/blanqueamiento-dental-238201.jpg",
    //   }