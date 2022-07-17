<template>
  <div>
    <van-picker
      title="标题"
      show-toolbar
      :columns="sexList"
      @confirm="onConfirmSex"
      @cancel="$emit('close')"
      :default-index="value"
    ></van-picker>
  </div>
</template>

<script>
import { updateUserName } from "@/api/user";

export default {
  data() {
    return {
      sexList: ["男", "女"],
      gender: this.value,
    };
  },
  props: {
    value: {
      type: String,
      require: true,
    },
  },
  methods: {
    async onConfirmSex(val) {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        if (val === "男") {
          await updateUserName({
            gender: 1,
          });
          this.gender = 1;
          this.$emit("input", this.gender);
        } else {
          await updateUserName({
            gender: 0,
          });
          this.gender = 0;
          this.$emit("input", this.gender);
        }

        // console.log(this.gender);
        // 关闭弹层
        this.$emit("close");
        this.$toast.success("修改性别成功");
      } catch (error) {
        this.$toast.fail("修改性别失败");
      }
    },
  },
};
</script>

<style>
</style>