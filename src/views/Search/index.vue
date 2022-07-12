<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />
    </form>
    <!-- 搜索结果页面 -->
    <SearchResult v-if="isShowResult" :searchText="searchText" />
    <!-- 搜索建议list组件 -->
    <SearchSuggestion
      @onSearch="onSearch"
      :searchText="searchText"
      v-else-if="searchText"
    />
    <!-- 搜索历史组件 -->
    <SearchHistory
      v-else
      @onSearch="onSearch"
      @deleteAll="deleteAll"
      :searchHistories="searchHistories"
    />
  </div>
</template>

<script>
import SearchHistory from "@/views/Search/components/search-history.vue";
import SearchSuggestion from "@/views/Search/components/search-suggestion.vue";
import SearchResult from "@/views/Search/components/search-result.vue";
import { getLocal, setLocal } from "@/utils/storage";
import { HISTORYKEY } from "@/constants";
export default {
  name: "SearchPage",
  components: { SearchHistory, SearchSuggestion, SearchResult },
  props: {},
  data() {
    return {
      searchText: "",
      isShowResult: false, // 是否展示搜索结果页面
      // 在 data 中添加一个数据用来存储历史记录
      searchHistories: getLocal(HISTORYKEY) || [],
    };
  },
  computed: {},
  watch: {
    searchHistories(value) {
      setLocal(HISTORYKEY, value);
    },
  },
  created() {},
  methods: {
    onSearch(value) {
      // 默认搜索历史
      // 如果输入框有内容 >> 搜索建议
      // 按下回车 >> 搜索结果
      if (value.trim() === "") return;
      this.isShowResult = true;
      this.searchText = value;
      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(value);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(value);
    },
    onCancel() {
      this.$router.back();
    },
    // 全部清除
    deleteAll() {
      this.searchHistories = [];
    },
  },
};
</script>

<style lang="less" scoped></style>
