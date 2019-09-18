const docLoader = require.resolve('./doc-loader.js');
module.exports = (isDev) => {
  return {
    preserveWhitespace: true, // 
    extractCss: !isDev,
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    },
    loaders: {
      'docs': docLoader
    }
    // hotReload: false, //根据环境变量生成
  }
}
