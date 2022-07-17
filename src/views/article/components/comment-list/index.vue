<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="出错了，点击刷新"
      @load="onLoad"
    >
      <!-- <van-cell :title="item.content" v-for="item in list" :key="item.art_id">
      </van-cell> -->
      <CommentItem
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
        @reply-ckick="$emit('replay-click', $event)"
      ></CommentItem>
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import { getComments } from "@/api/comment";
import CommentItem from "@/views/article/components/comment-item";
export default {
  name: "ArticleComment",
  components: {
    CommentItem,
  },
  props: {
    articleId: {
      type: String,
    },
    source: {
      type: [String, Number],
      require: true,
    },
    list: {
      type: Array,
    },
    type: {
      type: String,
      default: "a",
    },
  },
  data() {
    return {
      // list: [],
      // source: this.articleId,
      loading: false,
      finished: false,
      offset: null, // 请求下一页数据的页码
      totalCount: 0, // 总数据条数
      error: false,
    };
  },
  methods: {
    async onLoad() {
      try {
        const res = await getComments({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, // 每页大小
        });
        // console.log(res);
        // 放进去的是展开的{}
        // [{},{},{}...]
        this.list.push(...res.data.data.results);
        this.loading = false;
        if (res.data.data.last_id === res.data.data.end_id) {
          this.finished = true;
        } else {
          // 传进去的是上一条的id
          this.offset = res.data.data.last_id;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.van-list {
  margin-bottom: 45px;
}
</style>