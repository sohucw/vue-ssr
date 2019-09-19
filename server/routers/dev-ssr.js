const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs') // 扩展了fs模块功能，不把数据写入磁盘上面而是内存
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle
// 实时编译入口的文件 webpack.config.server
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  // webpack 报错的相关设置 输出和警告
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  // 在webpack-config_client.js中  new VueClientPlugin()中生成的
  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})
// 处理ssr
const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = 'wait a second...'
    return
  }
  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )
  // 带有script标签注入到ejs模板里面
  const clientManifest = clientManifestResp.data
  // 读取ejs模板文件
  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')
  const renderer = VueServerRenderer.createBundleRenderer(bundle,
    {inject: false, clientManifest})
  // 引入serverRender
  await serverRender(ctx, renderer, template)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
