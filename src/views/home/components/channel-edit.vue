<template>
  <div class="channel-edit">
    <van-cell style="text-align: center" title="编辑频道"></van-cell>
    <van-cell title="我的频道">
      <template #default>
        <van-button
          @click="isEdit = !isEdit"
          class="edit-btn"
          round
          plain
          size="mini"
          type="danger"
          >{{ isEdit ? "完成" : "编辑" }}</van-button
        >
      </template>
    </van-cell>
    <van-grid class="my-channel" :gutter="10">
      <van-grid-item
        @click="onMyChannelClick(value, index)"
        class="channel-item"
        v-for="(value, index) in myChannels"
        :key="index"
      >
        <template #icon v-if="isEdit && index !== 0">
          <van-icon name="clear"></van-icon>
        </template>
        <template #text>
          <span class="text" :class="{ active: active === index }">{{
            value.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道" :border="false"> </van-cell>
    <van-grid :gutter="10" class="recommend-channel" direction="horizontal">
      <van-grid-item
        @click="addChannel(value)"
        class="channel-item"
        v-for="(value, index) in resommendChannels"
        :key="index"
        icon="plus"
      >
        <template #text>
          <span class="text">{{ value.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {
  fetchAllChannels,
  fetchAddChannel,
  deleteUserChannel,
} from "@/api/channel";
// import { differenceBy } from "lodash";
// import differenceBy from "lodash/differenceBy";
import { differenceBy } from "@/utils/lodash";
import { Notify } from "vant";
import { setLocal } from "@/utils/storage";
import { mapState } from "vuex";
import { USERCHANNELKEY } from "@/constants";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    myChannels: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    resommendChannels() {
      // // 从所有的频道数据里面，找到我的频道数据 >> 过滤掉
      // return this.allChannels.filter((item) => {
      //   // 返回true >> 留下了
      //   // 什么样的数据才是满足条件的？

      //   // 如果找到了 true
      //   // 如果所有的频道里面的item在myChannels里面找到了，当前项就被保存
      //   return !this.myChannels.some((userItem) => userItem.id === item.id);
      // });
      return differenceBy(this.allChannels, this.myChannels, "id");
    },
  },
  watch: {},
  created() {
    this.getAllChannels();
  },
  mounted() {},

  methods: {
    async deleteChannel(channel) {
      try {
        if (this.user) {
          // 从接口删除
          await deleteUserChannel(channel.id);
        } else {
          // 修改之后的数据存储到本地存储
          setLocal(USERCHANNELKEY, this.myChannels);
        }
        this.$toast("删除成功");
      } catch (error) {
        this.$toast("删除失败");
      }
    },
    onMyChannelClick(channel, index) {
      // 1. 判断是否处于编辑状态

      if (this.isEdit) {
        // 处于编辑状态
        if (index === 0) return Notify({ type: "danger", message: "不让删除" });
        // if (index === 0) return this.$notify("不让删除");
        if (index <= this.active) {
          this.$emit("changeActive", this.active - 1, true);
        }
        // 从代码里面删除了数组的某一项
        this.myChannels.splice(index, 1);
        // 删除数据持久化
        this.deleteChannel(channel);
      } else {
        // 非编辑状态 >> 1、切换 >> 2、关弹层
        this.$emit("changeActive", index, false);
      }
    },
    async addChannel(channel) {
      // 子组件不允许修改子组件的数据
      this.myChannels.push(channel);
      // 持久化
      // 本地存储 >> 未登录
      // 线上服务器 >> 已登录
      // 判断是否登录 >> token >> vuex里面取值
      if (this.user) {
        try {
          //
          await fetchAddChannel({
            id: channel.id,
            seq: this.myChannels.length,
          });
          this.$toast("添加成功");
        } catch (error) {
          this.$toast("添加失败");
        }
      } else {
        // 未登录
        // 修改之后的个人频道数据存储到本地存储
        setLocal(USERCHANNELKEY, this.myChannels);
      }
    },
    async getAllChannels() {
      const { data } = await fetchAllChannels();
      console.log(data);
      this.allChannels = data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  .edit-btn {
    width: 100px;
  }
}
.channel-item .text {
  font-size: 0.37333rem;
  color: #222;
  margin-top: 0;
  /deep/ &.active {
    color: red;
  }
}
/deep/.channel-item .van-grid-item__content {
  background-color: #f4f5f6;
}
/deep/.recommend-channel {
  .van-icon-plus {
    color: #222;
    font-size: 30px;
    margin-right: 10px;
  }
}
/deep/.my-channel {
  .van-icon {
    position: absolute;
    right: -0.13333rem;
    top: -0.13333rem;
    font-size: 0.4rem;
    color: #cacaca;
    z-index: 2;
  }
}
.channel-item {
  /deep/.van-grid-item__icon-wrapper {
    position: unset;
  }
}
</style>
