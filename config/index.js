module.exports = {
  entry: {
    app: '../src/app.js'
  },
  // html入口
  view: {
    app: '../src/index.html'
  },
  // 文件hash长度-默认全长
  hashLength: 7,
  // 开发
  dev: {
    // 端口
    port: 3030,
    // 自动打开浏览器
    autoOpen: true,
    // 资源目录
    resourcesDir: 'static',
    // 资源请求地址
    publicPath: '/',
    // 源代码追踪
    sourceMap: true,
    // css提取
    cssExtract: false
  },
  // 构建
  build: {
    // 资源目录
    resourcesDir: 'static',
    // 输出目录
    outputPath: '../dist/',
    // 资源请求地址
    publicPath: '/',
    // 源代码追踪
    sourceMap: true,
    // css提取
    cssExtract: true,
    // 压缩html
    htmlMinify: false,
    // 压缩css
    cssMinify: false,
    // 压缩js
    jsMinify: false
  }
};
