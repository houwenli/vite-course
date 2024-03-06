const mockJs = require('mockjs')
  
const userList = mockJs.mock({
  'data|100': [{
    name: '@cname', // 生成不同的中文名
    ename: mockJs.Random.name(), // 生成不同的英文名
    'id|+2': 1, // 生成随机id
    time: '@time',
  }]
})

module.exports = [
  {
    method: 'post',
    url: '/api/users',
    response: ({body}) => {
      return {
        code: 200,
        msg: 'success',
        data: userList
      }
    }
  }
]