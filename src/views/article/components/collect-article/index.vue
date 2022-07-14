<template>
  <van-button class="btn" @click="change">
    <template #icon>
      <van-icon
        :style="isCollected ? 'red' : ''"
        :name="isCollected ? 'star' : 'star-o'"
        :loading="loading"
      ></van-icon>
    </template>
  </van-button>
</template>

<script>
import { addCollect, deleteCollect } from "@/api/article";
export default {
  name: "collectArticle",
  model: {
    prop: "isCollected",
    event: "changeCollected",
  },
  props: {
    isCollected: {
      type: Boolean,
      require: true,
    },
    authId: {
      type: [String, Number],
      require: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    change() {
      console.log(1);
      this.loading = true;
      try {
        if (this.isCollected) {
          deleteCollect(this.authId);
        } else {
          addCollect(this.authId);
        }
        this.$emit("changeCollected", !this.isCollected);
        this.isCollected = !this.isCollected;
        this.$toast(this.isCollected ? "收藏成功" : "取消收藏");
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$toast("数据请求失败");
      }
    },
  },
};
</script>

<style scoped lang='less'>
</style>
