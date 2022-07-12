import request from "@/utils/request";

/**
 * 获取频道的文章列表
 */
export const getArticles = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/articles",
    params,
  });
};

export const getArticleById = (articleId) => {
  return request({
    method: "GET",
    url: "v1_0/articles/" + articleId,
  });
};
