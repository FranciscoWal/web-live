const Usuario = require("../modelos/usuario")

async function nuevoUsuario(datos) {
    try {  
        await new Usuario(datos).save();
        console.log(datos);
        console.log("Usuario Añadido al 100")
    }
    catch (err) {
        console.log("Error")
    }
}
async function mostrarUsario(){
    try{
        var users = await Usuario.find();
        console.log("Mostrar Usuarios");
    }catch(err){
        console.log("Error"+err);
    }
    return users;
}
async function buscaeUserPorID(id){
    try{
        var userPack = await Usuario.findById(id);
        console.log("El Usuario se encontro: "+userPack.nombre);

    }catch(err){
        console.log("El Usuario No se encontro")
    }
    return userPack;
}
async function modificarUsuario(datos){
    try{
      var error = await Usuario.findByIdAndUpdate(datos.id,datos);
      console.log(error);
        
    }catch(err){
        console.log("No se encontro el Usuario")
    }
}
async function borrarUsuario(id){
    try{
       var error = await Usuario.deleteOne({_id:id});
       console.log("Usuario Borrador");
    }catch(err){
        console.log("Usuario Borrador");
    }
}
async function buscarIdporUser(user){
    var users = await mostrarUsario();
    
      users.forEach(async(u)=>{
        
        if (user==u.usuario){
            actualP = parseInt(u.points);
            u.points = actualP + 30;
            var err = await modificarUsuario(u);
            
        }else{
            console.log('Usuario No encontrado')
        }
    });
}


module.exports = {
    nuevoUsuario,
    mostrarUsario,
    buscaeUserPorID,
    borrarUsuario,
    modificarUsuario,
    buscarIdporUser
    
}