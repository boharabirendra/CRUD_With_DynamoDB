import { unmarshall } from "@aws-sdk/util-dynamodb";

import redis from "../redis/redis.js";
import * as ArticleModel from "../model/article.js";

export const getAllArticles = async () => {
  const cacheKey = "all:articles";
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit: Returning articles from cache");
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.error("Redis error (getAllArticles):", error);
  }

  try {
    const { Items } = await ArticleModel.getAllArticles();
    if (!Items || Items.length === 0) {
      return [];
    }

    const articles = Items.map((item) => unmarshall(item));

    await redis.set(cacheKey, JSON.stringify(articles), "EX", 3600);

    return articles;
  } catch (error) {
    console.error("Error in service layer - getAllArticles:", error);
    throw new Error("Could not fetch articles in service layer");
  }
};

export const getArticleById = async (articleId) => {
  try {
    const cacheKey = `article:${articleId}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit: Returning articles from cache");
      return JSON.parse(cachedData);
    }
    const { Item } = await ArticleModel.getArticleById(articleId);
    if (!Item) return null;

    const article = unmarshall(Item);

    await redis.set(cacheKey, JSON.stringify(article), "EX", 3600);

    return article;
  } catch (error) {
    console.error("Error in service layer - getArticleById:", error);
    throw new Error("Could not fetch article in service layer");
  }
};

export const createArticle = async (articleData) => {
  try {
    const result = await ArticleModel.createArticle(articleData);
    return result;
  } catch (error) {
    console.error("Error in service layer - createArticle:", error);
    throw new Error("Could not create article in service layer");
  }
};

export const deleteArticle = async (articleId) => {
  try {
    await ArticleModel.deleteArticle(articleId);
    await redis.del(`article:${articleId}`);
  } catch (error) {
    console.error("Error in service layer - deleteArticle:", error);
    throw new Error("Could not delete article in service layer");
  }
};

export const updateArticleById = async (articleId, username, updatedData) => {
  try {
    const { Attributes } = await ArticleModel.updateArticleById(
      articleId,
      updatedData
    );
    await redis.del(`article:${articleId}`);
    await redis.del(`articles:user:${username}`);
    return unmarshall(Attributes);
  } catch (error) {
    console.error("Error in service layer - updateArticleById:", error);
    throw new Error("Could not update article in service layer");
  }
};
export const getArticlesByUser = async (username) => {
  const cacheKey = `articles:user:${username}`;

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit: Returning articles from cache");
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.error("Redis error (getArticlesByUser):", error);
  }

  try {
    const { Items } = await ArticleModel.getArticlesByUser(username);
    if (!Items || Items.length === 0) {
      return [];
    }

    const articles = Items.map((item) => unmarshall(item));

    await redis.set(cacheKey, JSON.stringify(articles), "EX", 3600);

    return articles;
  } catch (error) {
    console.error("Error in service layer - getArticlesByUser:", error);
    throw new Error("Could not fetch articles in service layer");
  }
};
