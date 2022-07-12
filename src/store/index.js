import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const tokenKey = "toutiao_token";
import { getLocal, setLocal } from "@/utils/storage";
export default new Vuex.Store({
  // 用于存储全局状态数据
  state: {
    // 获取本地数据
    user: getLocal(tokenKey), // 存储token数据
  },
  getters: {},
  // 修改状态的唯一入口
  // 只允许有同步状态
  mutations: {
    // 修改state里面的user数据的方法
    // 保存本地数据
    setUser(state, user) {
      state.user = user;
      // localStorage.setItem(tokenKey, JSON.stringify(user));
      setLocal(tokenKey, user);
    },
  },
  actions: {},
  modules: {},
});
