<template>
  <div class="home-container">
    <!-- 搜索栏 -->
    <van-nav-bar fixed>
      <template #title>
        <van-button
          icon="search"
          block
          class="search-btn"
          size="small"
          type="info"
          round
          to="/search"
        >
          搜索
        </van-button>
      </template>
    </van-nav-bar>

    <!--
通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签
通过animated属性可以开启切换标签内容时的转场动画
通过swipeable属性可以开启滑动切换标签页
-->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in getUserChannels" :key="item.id"
        ><ArticleList :channel="item"></ArticleList
      ></van-tab>

      <template #nav-right>
        <div class="placeholder">
          <div class="hamburger-btn" @click="showPopup = true">
            <ToutiaoIcon class="toutiao" title="gengduo1"></ToutiaoIcon>
          </div>
        </div>
      </template>
    </van-tabs>

    <!-- 弹层结构 -->
    <van-popup
      close-icon-position="top-left"
      v-model="showPopup"
      closeable
      position="bottom"
      :style="{ height: '87%' }"
    >
      <ChannelEdit
        @changeActive="changeActive"
        :myChannels="getUserChannels"
        :active="active"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/channel";
import ArticleList from "@/views/home/components/article-list.vue";
import ChannelEdit from "@/views/home/components/channel-edit.vue";
import { getLocal } from "@/utils/storage";
import { USERCHANNELKEY } from "@/constants";
export default {
  name: "HomePage",
  components: { ArticleList, ChannelEdit },
  props: {},
  data() {
    return {
      showPopup: false,
      active: 0,
      getUserChannels: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.handle();
  },
  mounted() {},
  methods: {
    // 修改active值的方法！
    changeActive(index, status) {
      this.active = index;
      // 弹层关闭
      this.showPopup = status;
    },
    // 获取用户频道数据
    async handle() {
      // const { data } = await getUserChannels();
      //     console.log(data);
      //     this.getUserChannels = data.data.channels;
      try {
        // 获取用户token
        const token = this.$store.state.user?.token;
        // 获取本地存储2频道数据
        let channels = getLocal(USERCHANNELKEY);
        if (token || !channels) {
          const res = await getUserChannels();
          // console.log(data);
          channels = res.data.data.channels;
        }
        this.getUserChannels = channels;
      } catch (error) {
        this.$toast("获取频道数据失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
// 搜索栏样式
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
    width: 80%;
    .search-btn {
      background-color: #5babfb;
      border: none;
      font-size: 28px;
    }
    .van-icon {
      font-size: 32px;
    }
  }
}

/deep/ .channel-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    height: 80px;
    .van-tab__text {
      font-size: 27px;
      color: #777777;
    }
  }

  .van-tab--active .van-tab__text {
    color: #333 !important;
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background: rgba(50, 150, 250, 1);
    border-radius: 3px;
    bottom: 8px;
  }
  .van-tabs__nav {
    padding: 0;
  }
}
.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}
.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;

  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
}
</style>
