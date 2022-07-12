<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from "@/api/search";
export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: String,
  },
  data() {
    return {
      page: 1,
      per_page: 20,
      list: [],
      loading: false,
      finished: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      const res = await getSearch({
        q: this.searchText, // 搜索关键字
        page: this.page,
        per_page: this.per_page,
      });

      const { results } = res.data.data;
      console.log(results);
      this.list.push(...results);
      this.loading = false;

      if (results.length) {
        this.page += 1;
      } else {
        this.finished = true;
        return;
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
