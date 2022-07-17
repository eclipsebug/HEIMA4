<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <template #left>
        <van-icon @click="$emit('close')" color="white" name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem :comment="comment"></CommentItem>
    <van-cell title="评论回复" :border="false"></van-cell>
    <CommentList type="c" :list="list" :source="comment.com_id"></CommentList>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="writre-btn"
        size="small"
        round
        @click="isPostShow = true"
      >
        写评论
      </van-button>
    </div>
    <!-- 底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom"
      >发布评论

      <PostComment
        @postSuccess="postSuccess"
        type="c"
        :target="comment.com_id"
      ></PostComment>
    </van-popup>
    <!-- 发布评论 -->
  </div>
</template>

<script>
import CommentItem from "@/views/article/components/comment-item";
import CommentList from "@/views/article/components/comment-list";
import PostComment from "@/views/article/components/post-comment";

export default {
  name: "CommentReply",
  components: {
    CommentItem,
    CommentList,
    PostComment,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      isPostShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    postSuccess(comment) {
      console.log(comment);
      this.isPostShow = false; //关闭弹窗
      this.list.unshift(comment);
      console.log(this.comment.com_id);
      this.comment.reply_count++;
    },
  },
};
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>