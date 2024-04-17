const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const {conectarMongoDB} = require("./bd/conexion");
conectarMongoDB();
const { mqttIndex }= require("./mqtt/conexionMqtt");
mqttIndex();
const app = express();
const httpServer = http.createServer(app);
var rutaUsers = require("./rutas/usuarioRutas")
app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use("/", express.static(path.join(__dirname,'/views')));
app.use("/", rutaUsers);
const port = 3000;
httpServer.listen(port,()=>{
console.log("http://localhost:"+port);
});
