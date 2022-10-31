const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
});

const target = 'http://localhost:9081';

module.exports = {
  /*
  devServer: {
    port: 9080,
    proxy: {
      '^/api' : {
            target,
            changeOrigin: true
      }
    }
  }*/
}
