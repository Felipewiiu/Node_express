import express from "express";
import LivroController from "../controllers/livrosControler.js";
import paginar from "../middlewares/paginar.js";


const router = express.Router();
// O router precisa ser organizado do mais específico para o menos específico
router
  .get("/livros", LivroController.listarLivros, paginar)
  .get("/livros/busca", LivroController.listarLivrosPorFiltro, paginar)
  .get("/livros/:id", LivroController.listarLivrosPorId)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.excluirLivros);
export default router;