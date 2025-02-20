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
    const { username } = request.user;
    await ArticleService.deleteArticle(articleId, username);

    return response.status(200).json({
      message: `Deleted article with ID: ${articleId}`,
    });
  } catch (error) {
    console.error("Error in deleteArticle controller:", error);

    return response.status(500).json({
      error: error.message,
    });
  }
};

export const updateArticleById = async (request, response) => {
  try {
    const articleId = request.params.articleId;
    const { updatedData } = request.body;
    const { username } = request.user;
    const updatedArticle = await ArticleService.updateArticleById(
      articleId,
      username,
      updatedData
    );
    return response.status(200).json({
      updatedArticle,
      status: 200,
      message: `Updated article with ID: ${articleId}`,
    });
  } catch (error) {
    return response.status(404).json({
      error: error.message,
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
