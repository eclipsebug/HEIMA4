<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateUserPhoto } from "@/api/user";
export default {
  name: "UpdatePhoto",
  components: {},
  props: {
    // 预览图片地址信息
    img: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    });
  },
  methods: {
    // 确定事件
    onConfirm() {
      // 基于服务端的裁切使用 getData 方法获取裁切参数
      // console.log(this.cropper.getData())

      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        console.log(blob); // 裁剪后的结果信息
        this.updatePhoto(blob);
      });
      this.$emit("close");
    },

    // 上传文件的方法
    async updatePhoto(blob) {
      // photo
      // 怎样设置formData格式
      // axios >> 根据你的参数格式自动设置的ContentType
      // 查询字符串（name=x&age=10）>> application/x-www-form-urlencoded
      // object>application/json
      // formData >> multipart/form-data; bound=————WebKitFormBoundaryGnwmBAvekLZAnBt2
      const fd = new FormData();
      fd.append("photo", blob);
      // fd.forEach((value, key) => {
      //   console.log(key, value);
      // });
      const res = await updateUserPhoto(fd);
      // console.log(res);
      this.$emit("input", res.data.data.photo);
    },
  },
};
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>