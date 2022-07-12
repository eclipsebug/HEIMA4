import request from "@/utils/request";

/**
 * 获取搜索建议接口
 */

export const getSearchSuggestion = (q) => {
  return request({
    url: "v1_0/suggestion",
    params: {
      q,
    },
  });
};
/**
 * 获取搜索结果接口
 */

export const getSearch = (params) => {
  return request({
    url: "/v1_0/search",
    params,
  });
};
