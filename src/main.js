import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
import "@/utils/dayjs";
// vant注册
import Vant from "vant";
// 引入vant样式
import "vant/lib/index.less";

// 引入
// import request from "./utils/request";
// request.get("/v1_0/channels").then((res) => {
//   console.log(res.data.data.channels);
// });
// flexible 插件
import "amfe-flexible";

Vue.use(Vant);
import ToutiaoIcon from "@/components/ToutiaoIcon";
Vue.config.productionTip = false;

// 注册全局组件
Vue.component("ToutiaoIcon", ToutiaoIcon),
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
