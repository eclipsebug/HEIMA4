<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <input type="file" hidden ref="input" @change="fileChnage" />
    <van-cell title="头像" is-link @click="clickInput">
      <van-image class="avatar" fit="cover" round :src="`${userList.photo}`" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="userList.name"
      is-link
      @click="isShow = true"
    />
    <van-cell
      title="性别"
      :value="userList.gender === 0 ? '女' : '男'"
      is-link
      @click="isShowSex = true"
    />
    <van-cell
      title="生日"
      :value="userList.birthday"
      is-link
      @click="isShowAge = true"
    />

    <!-- 编辑昵称 -->

    <van-popup
      v-model="isShow"
      style="height: 80%"
      title="昵称设置"
      position="bottom"
    >
      <updataName v-model="userList.name" @close="isShow = false"></updataName>
    </van-popup>

    <!-- 编辑昵称 -->

    <!-- 编辑性别 -->

    <van-popup
      v-model="isShowSex"
      style="height: 50%"
      title="性别设置"
      position="bottom"
    >
      <!-- <van-picker
        title="标题"
        show-toolbar
        :columns="sexList"
        @confirm="onConfirmSex"
        @cancel="onCancelSex"
      ></van-picker> -->

      <updataSex
        v-model="userList.gender"
        @close="isShowSex = false"
      ></updataSex>
    </van-popup>

    <!-- 编辑性别 -->
    <!-- 编辑年龄 -->
    <van-popup
      v-model="isShowAge"
      style="height: 50%"
      title="性别设置"
      position="bottom"
    >
      <updataBirthday
        v-model="userList.birthday"
        @close="isShowAge = false"
      ></updataBirthday>
    </van-popup>
    <!-- 编辑年龄 -->

    <!-- 头像预览 -->
    <van-popup style="height: 100%" position="bottom" v-model="isShowImage">
      <UpdatePhoto
        @close="isShowImage = false"
        v-model="userList.photo"
        :img="img"
      ></UpdatePhoto>
    </van-popup>
    <!-- 头像预览 -->
  </div>
</template>

<script>
import updataName from "@/views/user-profile/commponents/updata-name.vue";
import updataSex from "@/views/user-profile/commponents/updata-sex.vue";
import updataBirthday from "@/views/user-profile/commponents/updata-birthday.vue";
import UpdatePhoto from "@/views/user-profile/commponents/update-photo.vue";
import { getUserProfile } from "@/api/user";
export default {
  components: {
    updataName,
    updataSex,
    updataBirthday,
    UpdatePhoto,
  },
  data() {
    return {
      userName: "",
      userList: {},
      img: "",
      isShow: false,
      isShowSex: false,
      isShowAge: false,
      isShowImage: false,
    };
  },

  created() {
    this.getUserInfo();
  },

  methods: {
    // close() {
    //   this.isShow = false;
    // },
    async getUserInfo() {
      const res = await getUserProfile();
      this.userList = res.data.data;

      console.log(this.userList);
    },
    clickInput() {
      // 拿取input的dom结构
      this.$refs.input.click();
    },
    // input上面有个change事件
    fileChnage(e) {
      const file = e.target.files[0];
      console.log(file);
      // 拿到图片的预览地址
      const url = URL.createObjectURL(file);
      this.img = url;
      this.isShowImage = true;
      console.log(url);
      //   获取到文件
    },
  },
};
</script>

<style scoped lang='less'>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  /deep/.van-nav-bar__text {
    color: aliceblue;
  }
}
</style>
