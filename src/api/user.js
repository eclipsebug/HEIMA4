// import request from "@/utils/request";

// export const login = (data) => {
//   return request({
//     method: "POST",
//     url: "/v1_0/authorizations",
//     data,
//   });
// };
/**
 * 用户相关的请求模块
 */
import request from "@/utils/request";
/**
 * 用户登录
 */
export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};

// 获取验证码接口
export const getSmsCode = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

// 需求：获取用户资料
// my/index.vue 封装请求的方法，created钩子内部进行调用
// 接口 >> 需要权限
// headers: {Authorization: 'Bearer token' }

// 获取用户信息接口
export const fetchUserInfo = () => {
  return request({
    method: "GET",
    url: "/v1_0/user",
    // headers: {
    //   // vuex里面的token
    //   Authorization: `Bearer ${store.state?.user?.token} `, // this.$store
    // },
  });
};

/**
 * 添加关注
 */
export const addFollow = (userId) => {
  return request({
    method: "POST",
    url: "/v1_0/user/followings",
    data: {
      target: userId,
    },
  });
};

/**
 * 取消关注
 */
export const deleteFollow = (userId) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/followings/${userId}`,
  });
};

/**
 * 获取用户个人资料
 */
// 获取指定用户信息
export const getUserProfile = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/profile",
  });
};

/**
 * 更新昵称
 */
export const updateUserName = (data) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/profile",
    data,
  });
};

/**
 * 更新用户照片资料
 */
export const updateUserPhoto = (data) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/photo",
    data,
  });
};
