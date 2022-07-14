<template>
  <div>
    <van-button class="btn" @click="chang">
      <template #icon>
        <van-icon :name="isLike === -1 ? 'good-job' : 'good-job-o'"></van-icon>
      </template>
    </van-button>
  </div>
</template>

<script>
import { addLike, deleteLike } from "@/api/article.js";
export default {
  model: {
    prop: "isLike",
    event: "changeLike",
  },
  props: {
    artId: {
      type: [String, Number],
      require: true,
    },
    isLike: {
      type: [String, Number],
    },
  },
  data() {
    return {};
  },
  methods: {
    async chang() {
      try {
        if (this.isLike === 1) {
          await deleteLike(this.artId);
          this.isLike = -1;
          this.$toast("点赞成功");
        } else {
          await addLike(this.artId);
          this.$toast("取消点赞");

          this.isLike = 1;
        }

        console.log(this.isLike);
      } catch (error) {
        this.$toast("出现错误");
      }
    },
  },
};
</script>

<style>
</style>