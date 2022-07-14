<template>
  <div>
    <van-button
      @click="onFollow"
      v-if="!value"
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      :loading="isFollowLoading"
      >关注</van-button
    >
    <van-button
      @click="onFollow"
      v-else
      class="follow-btn"
      round
      size="small"
      :loading="isFollowLoading"
      >已关注</van-button
    >
  </div>
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";
import { Notify } from "vant";
export default {
  props: {
    // value: {
    //   type: [String, Array],
    //   require: true,
    // },
    authId: {
      type: [Number, String, Object],
      require: true,
    },
    value: {
      type: [Boolean],
      require: true,
    },
  },
  data() {
    return {
      isFollowLoading: false, //关注状态
    };
  },
  methods: {
    async onFollow() {
      this.isFollowLoading = true;
      console.log(this.value);
      try {
        if (this.value) {
          await deleteFollow(this.authId);
        } else {
          await addFollow(this.authId);
        }
        // this.value = !this.value;
        this.$emit("input", !this.value);
        this.isFollowLoading = false;
        Notify({
          type: "success",
          message: this.value ? "关注成功" : "取消关注",
        });
      } catch (error) {
        console.log(error);
        Notify({
          type: "danger",
          message: "操作失败",
        });

        this.isFollowLoading = false;

        // this.$toast.fail("操作失败");
      }
    },
  },
};
</script>

<style>
</style>