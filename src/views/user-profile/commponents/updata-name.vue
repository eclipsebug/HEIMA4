<template>
  <div>
    <!-- 编辑昵称 -->
    <van-nav-bar
      class="page-nav-bar"
      title="编辑昵称"
      left-arrow
      right-text="完成"
      @click-right="onClickRight"
      @click-left="quexiao"
    />
    <van-cell-group>
      <van-field
        v-model="userName"
        rows="2"
        autosize
        label="昵称:"
        type="textarea"
        maxlength="7"
        placeholder="请输入用户名"
        show-word-limit
      />
    </van-cell-group>

    <!-- 编辑昵称 -->
  </div>
</template>

<script>
import { updateUserName } from "@/api/user";
export default {
  data() {
    return {
      userName: this.value,
    };
  },
  props: {
    value: {
      type: String,
    },
  },
  created() {},
  methods: {
    quexiao() {
      this.$emit("close");
      console.log(this.value);
    },
    async onClickRight() {
      // 修改页面的值
      this.$emit("input", this.userName);
      // 修改接口的值
      const res = await updateUserName({ name: this.userName });
      console.log(res);
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>