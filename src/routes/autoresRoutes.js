import express from "express";
import AutoresController from "../controllers/autoresController.js";

const route = express.Router();

route
  .get("/autores", AutoresController.listarAutor)
  .get("/autores/:id", AutoresController.listarAutorPorId)
  .post("/autores", AutoresController.cadastraAutor)
  .put("/autores/:id", AutoresController.atualizarAutorPorID)
  .delete("/autores/:id", AutoresController.excluirAutorPorId);

export default route;