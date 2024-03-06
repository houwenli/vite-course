// import path from 'path'
const path = require('path')
const fs = require('fs')

function difdDirAndFile(dirFilesArr = [], basePath= '') {
  const res = {
    dirs: [],
    files: []
  }

  dirFilesArr.forEach(name => {
    const fileStat = fs.statSync(path.resolve(__dirname, basePath + '/' + name))
    if(fileStat.isFile()) {
      res.files.push(name)
    } else if(fileStat.isDirectory()) {
      res.dirs.push(name)
    }
  })

  return res
} 

function getSrcDir() {
  const res = fs.readdirSync(path.resolve(__dirname, '../src'))
  let diffDir = difdDirAndFile(res, '../src')
  return diffDir.dirs
}

// vite插件必须返回一个配置对象
// 返回一个方法，便于定制化
module.exports = ({
  keyName = '@'
} = {}) => {
  return {
    // 可以返回部分配置，便于合并
    config: (config, env) => {
      let dir = getSrcDir()
      let aliasObj = {
        
      }
      aliasObj[`${keyName}`] = path.resolve(__dirname, '../src'),

      dir.forEach(item => {
        aliasObj[`${keyName}${item}`] = path.resolve(__dirname, `../src/${item}`)
      })
      return {
        resolve: {
          alias: aliasObj
        },
      }
    }
  }
}