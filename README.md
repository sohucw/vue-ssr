# vue-ssr-tech

## Build Setup

``` bash
# 安装依赖包
npm install

# 客户client端服务热重载 at localhost:8000
npm run dev:client

# 服务server端服务热重载 at localhost:3333
npm run dev:server

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
### plugin

1. husky  每次在提交代码的时候 执行  "precommit": "npm run lint-fix",
2. concurrently 一次性启动多个服务  "dev": "concurrently \"npm run dev:client\" \"npm run dev:server\"",
3.  vue-meta  放服务端渲染的meta信息
4. sha1 生成数据ku签名的
4. pm2部署node项目    npm i pm2 -g 
    - pm2 start pm2.yml --env production 启动
    - pm2 restart vue-ssr-todo  重启
    - pm2 stop  vue-ssr-todo stop
    - pm2 list  查看启动的服务
    - pm2 log vue-ssr-todo

    ssh root@sohucw.com => git pull  =>npm install  => num run build => pm2 start

    - 通过ngix 反向代理（通过域名访问到-80端口） 看nginx代理配置.png

### 静态资源上传到cdn
    1. 

### 第三方网站  （db后台存储是调佣的这个的接口）
https://www.apicloud.com/signup  可以申请一些免费的资源 apiclound

https://portal.qiniu.com/bucket  七牛 cdn static部署
安装  cnpm i qiniu -D 怎么用请看api https://developer.qiniu.com/kodo/sdk/1289/nodejs

### 黑科技
 <input
      type="password"
      class="login-input"
      placeholder="Password"
      autocomplete="new-password"   
      v-model="password"
    >

autocomplete="new-password" 处理自动填充的问题


### 服务端打包 优化
修改了webpack.config.server.js
plugins.push(new VueServerPlugin())  默认是在dev环境 错误的配置
