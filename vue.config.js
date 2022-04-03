module.exports = {
  devServer: {
    proxy: {
      '/v2': {
        target: 'https://api.myanimelist.net',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
						@import "@/styles/mixins.sass"
						@import "@/styles/variables.sass"
						@import "@/styles/slider.sass"
					`,
      },
    },
  },
}
