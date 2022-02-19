module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
					@import "@/styles/mixins.sass"
					@import "@/styles/variables.sass"
				`,
      },
    },
  },
}
