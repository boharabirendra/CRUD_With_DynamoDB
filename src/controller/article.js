import { request, response } from "express";
import * as ArticleService from "../service/article.js";

export const createArticle = async (request, response) => {
  const { articleId, author, title, content } = request.body;
  await ArticleService.createArticle({ articleId, author, title, content });
  return response.send({ status: 200, message: "Article created" });
};

export const getArticleById = async (request, response) => {
  const article = await ArticleService.getArticleById(request.params.id);
  return response.send({
    article,
    status: 200,
    message: "Article created Get by Id",
  });
};

export const getAllArticles = async (request, response) => {
  const articles = await ArticleService.getAllArticles();
  response.send({
    articles,
    status: 200,
    articles,
  });
};

export const deleteArticle = async (request, response) => {
  const articleId = request.params.id;
  await ArticleService.deleteArticle(articleId);
  response.send({
    status: 200,
    message: `Deleted article with ID: ${articleId}`,
  });
};

export const updateArticleById = async (request, response) => {
  const articleId = request.params.id;
  const { updatedData } = request.body;
  const updatedArticle = await ArticleService.updateArticleById(
    articleId,
    updatedData
  );
  return response.send({
    updatedArticle,
    status: 200,
    message: `Updated article with ID: ${articleId}`,
  });
};
