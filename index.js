import express from "express";
import usuarios from "./usuarios.js";

const app = express();

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/usuarios/:id", (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(usuario);
});

app.get("/usuarios/activos", (req, res) => {
  res.json(usuarios.filter(u => u.activo));
});

app.get("/usuarios/inactivos", (req, res) => {
  res.json(usuarios.filter(u => !u.activo));
});

app.get("/usuarios/ciudad/:ciudad", (req, res) => {
  const resultado = usuarios.filter(
    u => u.domicilio.ciudad.toLowerCase() === req.params.ciudad.toLowerCase()
  );
  res.json(resultado);
});

app.get("/usuarios/mayores/:edad", (req, res) => {
  res.json(usuarios.filter(u => u.edad > parseInt(req.params.edad)));
});

app.get("/usuarios/interes/:interes", (req, res) => {
  const resultado = usuarios.filter(u =>
    u.intereses.includes(req.params.interes.toLowerCase())
  );
  res.json(resultado);
});

app.get("/usuarios/nombres", (req, res) => {
  res.json(usuarios.map(u => u.nombre));
});

app.get("/usuarios/emails", (req, res) => {
  res.json(usuarios.map(u => ({ id: u.id, email: u.email })));
});

app.get("/usuarios/resumen", (req, res) => {
  res.json(
    usuarios.map(({ id, nombre, edad, activo }) => ({ id, nombre, edad, activo }))
  );
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
