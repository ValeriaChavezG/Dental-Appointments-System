const {response, request}= require("express");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const login= (req = request, res = response)=>{
    const {user, password} = req.body;

    if(!user || !password){
        res.status(400).json({
            msg: "Datos invalidos",
        });
        return;
    }
    User.findOne({user : user, password : password}).then((result)=>{
        if(result){
            generateJWT(user).then((token)=>{
                res.status(200).json({
                    token: token,
                    user,
                    // msg: "token"
                }); 
            }).catch((error)=>{
                res.status(500).json({
                    msg: error,
                })
            })
  
        }else{
            res.status(401).json({
                msg: "Usuario no encontrado",
            }); 
        }
    }).catch(()=>{
        res.status(401).json({
            msg: "No se obtiene el usuario",
        }); 
    });
};

const register = async (req = request, res = response) => {
    try {
        const { user, password, NombreCompleto, correoElectronico } = req.body;

        if (!user || !password) {
            return res.status(400).json({
                msg: "Faltan campos"
            });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ user });

        if (existingUser) {
            return res.status(400).json({
                msg: "El usuario ya existe"
            });
        }

        // Crear el nuevo usuario y generar el token
        const newUser = new User({ user, password, rol: "usuario", NombreCompleto, correoElectronico});
        await newUser.save();

        const token = await generateJWT(user);

        res.status(200).json({
            token
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error al crear el usuario",
            error
        });
    }
};

const isAdmin = (req = request, res = response) => {
    const rol = req.userActive.rol;
    if(rol == "admin"){
        res.status(200).json({
            msg: "Es admin"
        });
    }
    else{
        res.status(401).json({
            msg: "No es admin"
        });
    }
}
module.exports ={
    login,
    register,
    isAdmin
}