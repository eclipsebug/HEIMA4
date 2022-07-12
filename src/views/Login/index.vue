<template>
  <div class="login-container">
    <!-- 登录头标题描述 -->
    <van-nav-bar
      title="登录"
      class="page-nav-bar"
      left-text=""
      left-arrow
      @click-left="onClickLeft = $router.back()"
    />
    <!--  -->
    <van-form @submit="onSubmit" ref="form">
      <!-- 手机号 -->
      <van-field
        name="mobile"
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
        type="number"
        maxlength="11"
      >
        <template #left-icon>
          <ToutiaoIcon title="shouji1"></ToutiaoIcon>
        </template>
      </van-field>
      <!-- 验证码 -->
      <van-field
        v-model="user.code"
        name="code"
        placeholder="验证码"
        :rules="rules.code"
        required
        type="number"
        maxlength="6"
      >
        <!--  -->
        <template #left-icon>
          <ToutiaoIcon title="yanzhengma"></ToutiaoIcon>
        </template>
        <template #button>
          <van-count-down
            v-if="isSouCountDown"
            @finish="isSouCountDown = false"
            :time="time"
            format="ss s"
          />
          <van-button
            v-else
            @click="sendSmsCode"
            native-type="button"
            class="send-sms-btn"
            size="small"
            :loading="isDisabled"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import ToutiaoIcon from "@/components/ToutiaoIcon.vue";
import { login, getSmsCode } from "@/api/user";
// import { Toast } from "vant";
export default {
  name: "LoginIndex",
  data() {
    return {
      // 校验规则
      time: 5000,
      isSouCountDown: false,
      isDisabled: false,
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机格式不对",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码只能6位",
          },
        ],
      },
      user: {
        mobile: "13911111112", // 手机号
        code: "246810", // 验证码
      },
    };
  },
  // name: "LoginPage",
  components: { ToutiaoIcon },
  props: {},

  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      // console.log(values);
      // 1. 获取表单数据
      const user = this.user;
      // Toast.success('成功文案');
      // Toast.fail('失败文案');
      // 表单验证
      try {
        const res = await login(user);
        console.log("登录成功", res);
        this.$store.commit("setUser", res.data.data);
        // 登陆成功以后获取的数据存储到vuex和本地存储当中
        // Toast.success("登录成功");
        this.$toast("登录成功");

        // 跳转到首页
        this.$router.push("/");
      } catch (e) {
        Toast.fail(e?.response?.data?.message || "服务器端错误");
        // $toast.fail(e?.response?.data?.message || "服务器端错误");
      }
    },
    // 发送验证码
    async sendSmsCode() {
      // 多一步判断 如果mobile验证格式不对直接返回不去执行下面的try catch
      // 不同的try处理不同的错误
      // 1、 校验mobile表单
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        // console.log(e);
        return;
      }
      // 2、校验通过
      // 2-1: 按钮禁用 >> 发送请求 >> 拿到结果 >> 解除禁用
      try {
        this.isDisabled = true;
        // 调用获取验证码接口
        await getSmsCode(this.user.mobile);
        // 展示倒计时
        this.isSouCountDown = true;
        // 获取成功以后进行提示
        this.$toast.success("发送验证码成功");
      } catch (e) {
        // 如果获取失败，进行错误的提示
        this.$toast(e.response.data.message || "出错了");
      } finally {
        // 不管成功或者失败都会执行的逻辑
        this.isDisabled = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
}
</style>
