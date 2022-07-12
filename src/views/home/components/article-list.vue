<template>
  <div class="article-list">
    <!--
      List 列表组件：瀑布流滚动加载，用于展示长列表。

      List 组件通过 loading 和 finished 两个变量控制加载状态，
      当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 自动设置成 true，此时可以发起异步操作并更新数据，
      数据更新完毕后，将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

      - load 事件：
        + List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
        + 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。

      - loading 属性：控制加载中的 loading 状态
        + 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
        + 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件

      - finished 属性：控制加载结束的状态
        + 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
        + 所有数据加载结束，finished 为 true，此时不会触发 load 事件
     -->
    <van-pull-refresh
      :success-text="successText"
      v-model="refreshLoading"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="出错了,点击重新加载~"
      >
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
        <!-- <ArticleItem
          v-for="{ item, index } in list"
          :key="index"
          :article="article"
        ></ArticleItem> -->
        <ArticleItem v-for="(item, index) in list" :key="index" :article="item">
        </ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
    },
  },
  data() {
    return {
      list: [],
      loading: false, // 上拉加载更多的 loading 状态
      finished: false, // 是否加载结束
      timestamp: null, // 请求下一页数据的时间戳
      error: false,
      refreshLoading: false,
      successText: "🚀",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 获取文章列表数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 文章列表对应的频道id
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });
        // console.log(data);
        this.list = [...this.list, ...data.data.results];
        this.loading = false;

        // 数据已经请求完了
        if (data.data.results.length === 0) {
          // 如果数据请求完毕,finished置为true
          this.finished = true;
        } else {
          this.timestamp = data.data.pre_timestamp;
        }
      } catch (error) {
        // 如果捕获到错误,error属性改为true >> 展示错误的提示文字 >> 点击可以重新加载数据
        // 同时 loding >> false >> 方便下一次load事件的触发！
        console.log(error);
        this.error = true;
        this.loading = false;
      }
    },
    async onRefresh() {
      // 请求数据
      // onRefresh 事件触发默认会把loading >> true
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 文章列表对应的频道id
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });
        // 数据更新到现有数据前面
        this.list = [...data.data.results, ...this.list];
        this.refreshLoading = false;
        // 手动修改请求成功的提示文案
        this.successText = `更新了${data.data.results.length}条数据 🚀🚀🚀`;
      } catch (error) {
        this.refreshLoading = false;
        this.$toast.fail("请求失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 100px;
}
.article-item {
  position: fixed;
  top: 92px;
  z-index: 2;
  width: 100%;
}
.artcile-list {
  height: 79vh;
  overflow: auto;
}
</style>
