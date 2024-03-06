import componentACss from './componentA.module.css'
console.log(componentACss)

const div = document.createElement('div')
div.className = componentACss.footer

document.body.appendChild(div)