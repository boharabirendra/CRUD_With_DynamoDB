import { unmarshall } from "@aws-sdk/util-dynamodb";

import redis from "../redis/redis.js";
import * as ArticleModel from "../model/article.js";

export const getAllArticles = async () => {
  try {
    const { Items } = await ArticleModel.getAllArticles();
    return Items.map((item) => unmarshall(item));
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

    await redis.setex(cacheKey, 3600, JSON.stringify(article));

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
  } catch (error) {
    console.error("Error in service layer - deleteArticle:", error);
    throw new Error("Could not delete article in service layer");
  }
};

export const updateArticleById = async (articleId, updatedData) => {
  try {
    const { Attributes } = await ArticleModel.updateArticleById(
      articleId,
      updatedData
    );
    return unmarshall(Attributes);
  } catch (error) {
    console.error("Error in service layer - updateArticleById:", error);
    throw new Error("Could not update article in service layer");
  }
};

export const getArticlesByUser = async (username) => {
  try {
    const { Items } = await ArticleModel.getArticlesByUser(username);
    return Items.map((item) => unmarshall(item));
  } catch (error) {
    console.error("Error in service layer - getArticlesByUser:", error);
    throw new Error("Could not update article in service layer");
  }
};
