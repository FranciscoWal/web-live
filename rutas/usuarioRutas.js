var ruta = require("express").Router();
var { nuevoUsuario, mostrarUsario, buscaeUserPorID, modificarUsuario, borrarUsuario } = require("../bd/usuarioBD");

ruta.get("/newUser", (req, res) => {
    res.render("pages/createUser");
});
ruta.get("/", (req, res) => {
    res.render("pages/createUser");
});
ruta.post("/guardarUsuario", async (req, res) => {
    console.log(req.body);
    var user = [];
    user = req.body;

    var error = await nuevoUsuario(user);
    res.redirect("/");
});
ruta.get("/viewUser", async (req, res) => {
    var usuarios = await mostrarUsario();
    console.log(usuarios);
    res.render("pages/viewUsers", { usuarios });
});
ruta.get("/grafica", async (req, res) => {
    var usuarios = await mostrarUsario();
    console.log(usuarios);
    res.render("pages/graftUsersmqtt", { usuarios });
});
ruta.get("/weAreLiveRec", async (req, res) => {
    res.render("pages/whoAreLiveRec");
});
ruta.get("/editar/:id", async (req, res) => {
    var user = await buscaeUserPorID(req.params.id);
    console.log(user);
    res.render("pages/upgradeUsers", { user });
});
ruta.get("/borrar/:id", async (req, res) => {
    var user = await borrarUsuario(req.params.id);
    console.log(user);
    res.redirect("/viewUser");
});
ruta.post("/actUser", async(req,res)=>{
    var error = await modificarUsuario(req.body);
    res.redirect("/viewUser");
});

module.exports = ruta;