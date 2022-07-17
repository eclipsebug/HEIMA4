<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import dayJs from "dayjs";
import { updateUserName } from "@/api/user";

export default {
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      // 年月日
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  methods: {
    async onConfirm(val) {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });

      try {
        await updateUserName({
          birthday: dayJs(val).format("YYYY-MM-DD"),
        });
        console.log(dayJs(val).format("YYYY-MM-DD"));
        this.$emit("input", dayJs(val).format("YYYY-MM-DD"));
        this.$emit("close");
        this.$toast.fail("数据修改成功");
      } catch (error) {
        this.$toast.fail("数据更新失败");
      }
    },
  },
};
</script>

<style>
</style>