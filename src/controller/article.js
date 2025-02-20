import * as ArticleService from "../service/article.js";

export const createArticle = async (request, response) => {
  try {
    const { articleId, author, title, content } = request.body;
    const { username } = request.user;
    await ArticleService.createArticle({
      title,
      author,
      content,
      username,
      articleId,
    });
    return response.send({ status: 200, message: "Article created" });
  } catch (error) {
    return response.send({
      error,
      status: 500,
      message: "Failed to create article",
    });
  }
};

export const getArticleById = async (request, response) => {
  try {
    const article = await ArticleService.getArticleById(
      request.params.articleId
    );
    return response.send({
      article,
      status: 200,
      message: "Article created Get by Id",
    });
  } catch (error) {
    return response.send({
      error,
      status: 404,
      message: `Failed to fetch article: ${request.params.articleId}`,
    });
  }
};

export const getAllArticles = async (request, response) => {
  try {
    const articles = await ArticleService.getAllArticles();
    return response.send({
      articles,
      status: 200,
      articles,
    });
  } catch (error) {
    return response.send({
      error,
      status: 500,
      message: "Failed to fetch all articles",
    });
  }
};

export const deleteArticle = async (request, response) => {
  try {
    const articleId = request.params.articleId;
    await ArticleService.deleteArticle(articleId);
    response.send({
      status: 200,
      message: `Deleted article with ID: ${articleId}`,
    });
  } catch (error) {
    return response.send({
      status: 404,
      message: `Failed Deleting article with ID: ${articleId}`,
    });
  }
};

export const updateArticleById = async (request, response) => {
  try {
    const articleId = request.params.articleId;
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
  } catch (error) {
    return response.send({
      error,
      status: 404,
      message: `Failed Updating article with ID: ${articleId}`,
    });
  }
};

export const getArticlesByUser = async (request, response) => {
  try {
    const username = request.params.username;
    const articles = await ArticleService.getArticlesByUser(username);
    return response.send({
      articles,
      status: 200,
      message: `Articles by user: ${username}`,
    });
  } catch (error) {
    return response.send({
      error,
      status: 404,
      message: `Failed to articles username: ${username}`,
    });
  }
};
