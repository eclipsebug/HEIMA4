module.exports = {
  plugins: {
    autoprefixer: {
      Browserslist: ["Android >= 4.0", "iOS >= 8"],
    },
    "postcss-pxtorem": {
      // 根据设计稿的尺寸/10 得到rootValue的值
      // 我们自己的设计稿是75
      rootValue: (arg) => {
        // console.log(arg);
        return arg.file.includes("vant") ? 37.5 : 75;
      },
      propList: ["*"],
      // 忽略 github-markdown-css
      exclude: "github-markdown-css",
    },
  },
};
