const fs = require('fs')
const path = require('path')

const mockStat = fs.statSync('mock')
const isDirectory = mockStat.isDirectory()
let mockRes = [];
if (isDirectory) {
  mockRes = require(path.resolve(process.cwd(), 'mock/mock'))
}



module.exports = (options) => {
  // 拦截http请求
  // 比如请求/api/users，不强制加域名，会主动补全
  // 此时就会请求到vite启动的服务器
  // 此时vite-server服务器就能操作用户请求

  return {
    configureServer(server){
      server.middlewares.use((req, res, next) => {
        if(req.url.startsWith('/api')) {
          let mockObj = mockRes.find(item => item.url == req.url)
          // 强制设置json格式
          res.setHeader('Content-Type', 'application/json')

          res.end(JSON.stringify(mockObj.response({})))
        } else {
          next()
        }
      })
    }
   }
}