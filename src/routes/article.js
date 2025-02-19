import express from "express";
import * as ArticleController from "../controller/article.js";

const router = express.Router();

router.get("/", ArticleController.getAllArticles);

router.get("/all/:userId", ArticleController.getArticlesByUser);

router.get("/:id", ArticleController.getArticleById);

router.delete("/:id", ArticleController.deleteArticle);

router.post("/create", ArticleController.createArticle);

router.put("/:id", ArticleController.updateArticleById);

export default router;
