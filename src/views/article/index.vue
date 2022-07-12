<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail markdown-body" v-else-if="articles.art_id">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articles.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articles.aut_photo"
          />
          <div slot="title" class="user-name">{{ articles.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articles.pubdate | relativeTime }}
          </div>
          <van-button
            @click="onFollow"
            v-if="!articles.is_followed"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            >关注</van-button
          >
          <van-button
            @click="onFollow"
            v-else
            class="follow-btn"
            round
            size="small"
            >已关注</van-button
          >
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="content"
          class="article-content"
          v-html="articles.content"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="isNotFound">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArtcileInfo"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777" />
      <van-icon color="#777" name="star-o" />
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById } from "@/api/article";
import { ImagePreview } from "vant";
import { addFollow, deleteFollow } from "@/api/user";

// 引入
import "github-markdown-css";
export default {
  name: "ArticleIndex",
  components: {},
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      articles: {}, // 文章对象
      loading: false, // 文章加载状态
      isNotFound: false, // 标识当前不是404状态,
      isFollowLoading: false, //关注状态
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getArtcileInfo();
  },
  mounted() {},
  methods: {
    previewImg() {
      // 获取所有的img图片
      // src属性
      // push到一个新的数组里面
      // 获取到界面所有的图片dom结构
      const imgs = this.$refs.content.querySelectorAll("img");
      console.log(imgs);
      const images = [];

      imgs.forEach((item, index) => {
        images.push(item.src);
        item.addEventListener("click", function () {
          ImagePreview({
            images: images,
            startPosition: index,
          });
        });
      });
      console.log(images);
    },
    async getArtcileInfo() {
      this.loading = true;
      try {
        const { data } = await getArticleById(this.articleId);

        // console.log(data);
        this.articles = data.data;
        // 已经成功获取到了数据
        // 绑定图片预览功能 >> img图片
        this.loading = false;

        // 因为界面的更新是异步的
        // 所有修改完数据以后，直接获取最新的dom结构是获取不到的
        // 需要通过$nextTick在界面更新完毕以后再去获取才可以
        // $nextTick: 界面更新完毕以后想要拿到最新的dom结构就可以使用这个api
        this.$nextTick(() => {
          this.previewImg();
        });
      } catch (e) {
        this.loading = false;
        this.isNotFound = e?.response?.status === 404;
      }
    },
    async onFollow() {
      console.log(this.articles.is_folllowed);
      try {
        if (this.articles.is_folllowed) {
          await deleteFollow(this.articles.aut_id);
        } else {
          await addFollow(this.articles.aut_id);
        }
        this.articles.is_followed = !this.articles.is_followed;
      } catch (error) {
        console.log(error);
        // this.$toast.fail("操作失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
