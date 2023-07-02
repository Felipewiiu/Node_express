import express from "express";
import LivroController from "../controllers/livrosControler.js";


const router = express.Router();
// O router precisa ser organizado do mais específico para o menos específico
router
    .get("/livros", LivroController.listarLivros)
    .get("/livros/busca", LivroController.listarLivrosPorEditora)
    .get("/livros/:id", LivroController.listarLivrosPorId)
    .post("/livros", LivroController.cadastrarLivro)
    .put("/livros/:id", LivroController.atualizarLivro)
    .delete("/livros/:id", LivroController.excluirLivros)
export default router;