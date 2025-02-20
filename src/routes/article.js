import express from "express";

import { authenticate } from "../middleware/user.js";
import * as ArticleController from "../controller/article.js";

const router = express.Router();

router.get("/", ArticleController.getAllArticles);

router.get("/all/:username", authenticate, ArticleController.getArticlesByUser);

router.get("/:articleId", ArticleController.getArticleById);

router.delete("/:articleId", authenticate, ArticleController.deleteArticle);

router.post("/create", authenticate, ArticleController.createArticle);

router.put("/:articleId", authenticate, ArticleController.updateArticleById);

export default router;
