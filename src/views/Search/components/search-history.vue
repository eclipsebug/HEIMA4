<template>
  <div>
    <van-cell title="搜索历史">
      <template #default v-if="isDeleteStatus">
        <van-tag class="btn" type="danger" @click="deleteAll">全部删除</van-tag>
        <van-tag class="btn" type="success" @click="isDeleteStatus = false"
          >完成</van-tag
        >
      </template>
      <van-icon name="delete" @click="isDeleteStatus = true"></van-icon>
    </van-cell>

    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="deleteHistroyItem(item, index)"
    >
      <template #default v-if="isDeleteStatus">
        <van-icon name="clear"></van-icon>
      </template>
    </van-cell>
    <!-- <van-cell title="我是历史记录">
      <template #default v-if="isDeleteStatus">
        <van-icon name="clear"></van-icon>
      </template>
    </van-cell> -->
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  watch: {},
  props: {
    searchHistories: {
      type: Array,
    },
  },
  data() {
    return {
      isDeleteStatus: false,
    };
  },
  methods: {
    // 通知父组件 清空
    deleteAll() {
      this.$emit("deleteAll");
    },
    deleteHistroyItem(item, index) {
      //  点击处于历史项的时候，需要条件判断
      // 如果处于删除状态，进行删除
      // 如果不处于删除状态，进行搜索
      if (this.isDeleteStatus) {
        // 删除
        this.searchHistories.splice(index, 1);
      } else {
        // 搜索
        this.$emit("onSearch", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  margin-right: 10px;
}
</style>
