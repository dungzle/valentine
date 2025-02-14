module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  publicPath: process.env.NODE_ENV === 'production' ? 'https://github.com/dungzle/valentine' : '/'
}
