const {response, request}= require("express");


const verifyAdmiRole = (req = request, res= response, next) =>{
    if(!req.userActive){
        res.status(401).json({
            msg: "Permiso denegado",
        }); 
        return;
    }
    if(req.userActive.rol != "admin"){
        res.status(401).json({
            msg: "Permiso denegado",
        }); 
        return;
    }
    next();
}

module.exports ={
    verifyAdmiRole
}