const {response, request}= require("express");

const usersGet = (req=request, res = response)=>{
    const {user} = req.userActive;
    if(!user){
        res.status(400).json({
            msg: "Falta el usuario"
        });
        return;
    }
    User.findOne({user: user}).then(
        (result) => {
            res.status(200).json({
                User: result
            });
        }
    ).catch(
        (error) => {
            res.status(500).json({
                msg: "Error al obtener el usuario",
                error
            });
        }
    );
};

const userPost = (req =request, res = response) => {
    const {user} = req.userActive;
    const {password, edad, bio} = req.body;
    if(!user){
        res.status(400).json({
            msg: "Falta el usuario"
        });
        return;
    }
    if(!password && !edad && !bio){
        res.status(400).json({
            msg: "Faltan campos"
        });
        return;
    }
    User.findOne({user: user}).then(
        (result) => {
            if(result){
                result.password = password;
                result.edad = edad;
                result.bio = bio;
                result.save();
                res.status(200).json({
                    msg: "Usuario actualizado"
                });
            }else{
                console.log(result);
                res.status(404).json({
                    msg: "Usuario no encontrado"
                });
            }
        }
    ).catch(
        (error) => {
            res.status(500).json({
                msg: "Error al actualizar el usuario",
                error
            });
        }
    )
}

const userDelete = (req= request, res= response)=>{
    const id = req.params.id;
    res.status(200).json({
        msg: "Api DELETE users - controllers",
        result: "El usuario "+ id + " será eliminado"
    });
};

const userPut = (req= request, res = response)=>{
    const id1= req.body.id;
    const id2 = req.params.id;
     const id3=req.query.id;
    res.status(200).json({
        msg: "Api PUT users - controllers",
        id1,
        id2,
        id3
    });
}
 const userPatch = (req, res)=>{
    res.status(405).json({
        msg: "Api PATCH users - controllers",
  
    });
}

module.exports ={
    usersGet,
    userPost,
    userDelete,
    userPut,
    userPatch

}