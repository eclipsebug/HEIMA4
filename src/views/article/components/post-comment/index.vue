<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button class="post-btn" size="small" @click="onAddComment"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from "@/api/comment";
export default {
  name: "PostComment",
  components: {},
  props: {
    articleId: {
      type: [String, Number],
      require: true,
    },
    target: {
      type: [String, Number],
      require: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  // 子组件注入文章的id。可以直接在当前组件使用
  inject: ["articleId"], //文章的id
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onAddComment() {
      try {
        // loading效果
        this.$toast.loading({
          duration: 0, //表示toast不会消失
          forbidClick: true, //禁用背景点击
        });
        if (this.message.trim() === "") {
          return this.$toast("内容不能为空！！");
        }
        const res = await addComment({
          target: this.target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          art_id: this.type === "c" ? this.articleId : null, // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        });
        // console.log(res);
        this.$toast.success("发布评论成功");
        // 成功后清空内容
        this.message = "";
        // 关闭弹层
        this.$emit("postSuccess", res.data.data.new_obj);
        // console.log(res.data.data.new_obj);
      } catch (error) {
        this.$toast.fail("发布评论失败");
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>