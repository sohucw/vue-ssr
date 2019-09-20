const qiniu = require('qiniu')
const fs = require('fs')
const path = require('path')
const cdnConfig = require('../app.config').cdn

// const noNeedUploadFileList = ['index.html', 'server.ejs', 'server-entry.js']
const {
  ak, sk, bucket
} = cdnConfig

const mac = new qiniu.auth.digest.Mac(ak, sk)

const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z0 // https://developer.qiniu.com/kodo/sdk/1289/nodejs#5

const doUpload = (key, file) => {
  const options = {
    scope: bucket + ':' + key
  }
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, file, putExtra, (err, body, info) => {
      if (err) {
        return reject(err)
      }
      if (info.statusCode === 200) {
        resolve(body)
      } else {
        reject(body)
      }
    })
  })
}

const publicPath = path.join(__dirname, '../public')

// publicPath /resource/client/....
const uploadAll = (dir, prefix) => {
  const files = fs.readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const key = prefix ? `${prefix}/${file}` : file
    if (fs.lstatSync(filePath).isDirectory()) {
      return uploadAll(filePath, key)
    }
    doUpload(file, filePath)
    // .then(resp => console.log(resp))
    // .catch(err => console.log(err))
  })
}

uploadAll(publicPath)
// const files = fs.readdirSync(path.join(__dirname, '../public'))
// const uploads = files.map(file => {
//   if (noNeedUploadFileList.indexOf(file) === -1) {
//     return doUpload(
//       file,
//       path.join(__dirname, '../public', file)
//     )
//   } else {
//     return Promise.resolve('no need upload file ' + file)
//   }
// })

// Promise.all(uploads).then(resps => {
//   console.log('upload success:', resps)
// }).catch(errs => {
//   console.log('upload fail:', errs)
//   // process.exit(0)
// })
