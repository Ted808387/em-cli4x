module.exports = {
  publicPath: process.env.NODE_ENV === 'production'  ? '/em-cli4x/' : '/',
  devServer: {
    proxy: {
      '/API': {
        target: 'https://vue-course-api.hexschool.io', 
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/API': '/API'
        }
      }
    }
  }
}

