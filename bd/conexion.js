const mongoose = require('mongoose');

require('dotenv').config(); 
async function conectarMongoDB(){
    mongoose.set('strictQuery', true);
    try{
        const conexion = await mongoose.connect(process.env.mongoAtlas);
        console.log("MongoDB esta Activo")
    }
    catch(err){
        console.log("Hubo un error en la coneccion: "+err);
    }
}
module.exports={
    conectarMongoDB,mongoose
}

