<template>
  <div class="search-suggestion">
    <van-cell
      @click="hancleClick(item)"
      v-for="(item, index) in list"
      :key="index"
      :title="item"
      icon="search"
    >
      <template #title>
        <div v-html="highLight(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/search";
// lodash 支持按需加载，有利于打包结果优化
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: String,
  },
  data() {
    return {
      list: [],
    };
  },
  computed: {},
  watch: {
    searchText: {
      immediate: true, // 首次也需要监听
      handler: debounce(function (value) {
        this.getSuggestion(value);
      }, 500),
      // handler(value) {
      //   this.getSuggestion(value);
      // },
    },
  },
  created() {},
  mounted() {},
  methods: {
    highLight(item) {
      const reg = new RegExp(this.searchText, "gi");
      return item.replace(
        reg,
        `<span style='color:red'>${this.searchText}</span>`
      );
    },
    hancleClick(value) {
      console.log(value);
      this.$emit("onSearch", value);
    },
    async getSuggestion(q) {
      const { data } = await getSearchSuggestion(q);
      // console.log(data);
      this.list = data.data.options;
      // this.list = data.data.options.map((item) => {
      //   // 构建替换的正则表达式 g全局匹配 i忽略大小写
      //   const reg = new RegExp(this.searchText, "gi");
      //   // 把获取到的搜索建议进行正则替换，替换成 标签+用户输入的内容 >> 实现高亮效果
      //   return item.replace(
      //     reg,
      //     `<span style='color:red'>${this.searchText}</span>`
      //   );
      // });
    },
  },
};
</script>

<style scoped lang="less"></style>
