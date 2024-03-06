import {
  count
} from './counter.js'

import './componentA.js'

import './componentB.js'

import './test.less'

import './index.css'


console.log('count', count)

// import imgUrl from '@assets/images/veer-436460688.webp'

// const img = document.createElement('img')

// img.src = imgUrl

// document.body.appendChild(img)

import('@assets/images/veer-436460688.webp').then(data => {
  console.log('data', data.default)

  const img = document.createElement('img')

  img.src = data.default

  document.body.appendChild(img)
})



import test from '@assets/json/test.json'

console.log(test)


fetch('/api', {
  method: 'post'
}).then(data => {
  console.log(data)
}).catch(err => {
  console.log('error', err)
})


import __ from 'lodash'
console.log(3333, __.cloneDeep({}))


