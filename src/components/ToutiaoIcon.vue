<template>
    <!-- <i class="toutiao toutiao-wuwangluo1"></i>
    <i class="toutiao toutiao-shipin1"></i>
    <i class="toutiao toutiao-yuedu"></i> -->
    <i :class="['toutiao', `toutiao-${title}`]"></i>
</template>
` `
<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
  mounted() {
    console.log(this.title);
  },
};
</script>

<style></style>
