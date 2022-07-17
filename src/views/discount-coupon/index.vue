<template>
  <div class="discount">
    <div class="title">1688进货红包</div>
    <div class="beijing" v-for="(item, index) in list" :key="index">
      <img src="" alt="" />
      <div class="left">
        <div class="num">{{ item.money }}</div>
        <div class="yuan">元</div>
      </div>
      <div class="content">
        <div class="one">{{ item.title }}</div>
        <div class="two">{{ item.description }}</div>
        <div class="three">
          <!-- 倒计时 -->
          <div class="time" v-if="item.restTime" ref="btn">
            <div @click="showTime(item.restTime)" hidden>11111</div>
            距结束
            <div class="ti">{{ h }}</div>
            <div class="dian">:</div>
            <div class="ti">{{ m }}</div>
            <div class="dian">:</div>

            <div class="ti">{{ s }}</div>
            <!-- {{ count }} -->
          </div>
          <!-- 有效期 -->
          <div class="time" v-else>
            <div>
              有效期：{{ item.time[1] | SJCTime }}-{{ item.time[0] | SJCTime }}
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="status">{{ item.status }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayJs from "dayjs";

import { getDiscount } from "@/api/discount";
import { login } from "@/api/user";

export default {
  mounted() {
    this.Time(); //调用定时器
    // this.dianji();
  },
  data() {
    return {
      list: [],
      time1: "",
      count: "", //倒计时
      seconds: "11543", // 倒计时秒数
      h: "",
      m: "",
      s: "",
    };
  },
  created() {
    this.getDiscount();
    this.countTime();
  },
  methods: {
    async getDiscount() {
      const res = await getDiscount();

      this.list = res.data.list;
    },
    // 获取时间戳
    showTime(a) {
      this.seconds = a;
      console.log(a);
      console.log(this.$refs.btn);
    },
    // 天 时 分 秒 格式化函数
    countDown() {
      // let d = parseInt(this.seconds / (24 * 60 * 60));
      // d = d < 10 ? "0" + d : d;
      let h = parseInt((this.seconds / (60 * 60)) % 24);
      h = h < 10 ? "0" + h : h;
      let m = parseInt((this.seconds / 60) % 60);
      m = m < 10 ? "0" + m : m;
      let s = parseInt(this.seconds % 60);
      s = s < 10 ? "0" + s : s;
      this.h = h;
      this.m = m;
      this.s = s;
      this.count = h + "时" + m + "分" + s + "秒";
    },
    //定时器没过1秒参数减1
    Time() {
      setInterval(() => {
        this.seconds -= 1;
        this.countDown();
      }, 1000);
    },
  },
};
</script>

<style scoped lang='less'>
.discount {
  width: 714px;
  padding-top: 31px;
  padding-left: 13px;
  .title {
    margin-bottom: 22px;
    font-size: 32px;
    font-weight: bold;
  }
}
.beijing {
  width: 690px;
  height: 180px;
  background-image: url(https://wuxiaohui-1254415986.cos.ap-nanjing.myqcloud.com/uPic/O1CN01SzXzZl1U46EOknhoB_!!6000000002463-2-tps-1380-362-20220717160515359.png);
  background-size: 715px;
  display: flex;
  align-items: center;
  padding-left: 26px;
  .left {
    color: #a45927;
    position: relative;
    // display: flex;
    width: 150px;
    .num {
      font-size: 68px;
    }
    .yuan {
      position: absolute;
      bottom: 14px;
      right: 0;
      font-size: 28px;
    }
    margin-right: 25px;
  }
  .content {
    color: #ffe9b0;
    // margin-right: 31px;
    .one {
      font-size: 36px;
    }
    .two {
      font-size: 22px;
      margin: 4px 0 16px 0;
    }
    .three {
      font-size: 20px;
      display: flex;
      .time {
        width: 5rem;
        margin-left: 10px;
        display: flex;
        .dian {
          font-size: 3px;
          margin: 0 5px;
        }
        .ti {
          font-size: 22px;
          color: #ff4000;
          width: 34px;
          height: 32px;
          border-radius: 3px;
          background-image: linear-gradient(#ffe9b0, #fff1ce);
          line-height: 32px;
          text-align: center;
        }
      }
    }
  }
  .right {
    width: 164px;
    height: 64px;
    font-size: 36px;
    color: #a45927;

    background-color: rgb(255, 225, 180);
    border-radius: 32px;
    display: flex;
    justify-content: center;
    // align-content: center;
    line-height: 64px;
  }
}
</style>