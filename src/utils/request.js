// 配置axios实例
import store from "@/store";
import axios from "axios";
import JSONBig from "json-bigint";

// 创建一个axios实例
// 通过axios创建出来的实例根axios一模一样
// 但是集成了一些配置选项
const request = axios.create({
  baseURL: "http://42.192.129.12:8000",
  transformResponse: [
    function (data) {
      // data json 格式 >>里面可能包含大数字
      try {
        return JSONBig.parse(data);
      } catch (error) {
        return data;
      }
    },
  ],
});

// request.get("http://localhost:3000/name").then((res) => {
//   console.log(res);
// });

// 设置请求拦截器
request.interceptors.request.use(
  (config) => {
    // config >> 当前配置项
    // 设置token
    // 判断token是否存在
    const token = store.state?.user?.token;

    // 判断token是否存在
    // 存在 >> 添加请求体
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 配置完return >> config配置项
    return config;
  },
  (err) => {
    // 为了报错
    return Promise.reject(err);
  }
);
request.interceptors.request.use(); // 响应拦截器
// 拦截 后端 传过来的大数字

export default request;
