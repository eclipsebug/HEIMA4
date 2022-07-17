<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click="back"
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
          <FollowUser
            :authId="articles.aut_id"
            v-model="articles.is_followed"
          ></FollowUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="content"
          class="article-content"
          v-html="articles.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论组件 -->
        <CommentList
          :list="commentList"
          :source="articles.art_id"
          @replay-click="onReplayClick"
        ></CommentList>
        <!-- 评论组件 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 评论组件 -->

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
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777" />
      <CollectAtticle
        :authId="articles.aut_id"
        v-model="articles.is_collected"
      ></CollectAtticle>

      <Like :artId="articles.art_id" v-model="articles.attitude"></Like>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <!-- 发布文章评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <PostComment
        @postSuccess="postSuccess"
        :articleId="articles.art_id"
      ></PostComment>
    </van-popup>
    <!-- /发布文章评论 -->

    <!-- 评论回复 -->
    <van-popup
      v-if="isReplyShow"
      v-model="isReplyShow"
      position="bottom"
      style="height: 95%"
    >
      <CommentReply
        @close="isReplyShow = false"
        :comment="currentComment"
      ></CommentReply>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import { getArticleById } from "@/api/article";
import { ImagePreview } from "vant";
// 引入封装的组件
import FollowUser from "@/views/article/components/follow-user";
import CollectAtticle from "@/views/article/components/collect-article";
import Like from "@/views/article/components/like-article";
import CommentList from "@/views/article/components/comment-list";
import PostComment from "@/views/article/components/post-comment";
import CommentReply from "@/views/article/components/comment-reply.vue";
// 引入
import "github-markdown-css";
export default {
  name: "ArticleIndex",
  components: {
    FollowUser,
    CollectAtticle,
    Like,
    CommentList,
    PostComment,
    CommentReply,
  },
  provide() {
    return {
      articleId: this.articleId,
    };
  },
  props: {
    // 使用props路由动态的数据
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
      isPostShow: false,
      commentList: [],
      isReplyShow: false, //回复用户
      currentComment: {},
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getArtcileInfo();
  },
  mounted() {},
  methods: {
    back() {
      this.$router.back();
      console.log(1);
    },
    onReplayClick(comment) {
      this.isReplyShow = true;

      console.log(comment);
      this.currentComment = comment;
    },
    // 关闭弹层

    postSuccess(data) {
      this.isPostShow = false;
      this.commentList.unshift(data);
    },
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
