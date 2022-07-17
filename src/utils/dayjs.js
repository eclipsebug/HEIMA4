import dayjs from "dayjs";
// 默认英文
// 注册中文语言包
require("dayjs/locale/zh-cn");

// 引用相对时间的包
import relativeTime from "dayjs/plugin/relativeTime";
import Vue from "vue";

dayjs.extend(relativeTime);

dayjs.locale("zh-cn"); // 全局使用简体中文

// 当前时间 to 目标时间
console.log(dayjs().to(dayjs("2020-11-11"))); // 多少年前

// 过滤器
Vue.filter("relativeTime", (value) => {
  return dayjs().to(dayjs(value));
});
Vue.filter("SJCTime", (value) => {
  return dayjs(value).format("MM.DD hh:mm");
});
