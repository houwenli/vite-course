import componentBCss from './componentB.module.css'
console.log(componentBCss)

const div = document.createElement('div')
div.className = componentBCss.footer

document.body.appendChild(div)


const div1 = document.createElement('div')
div1.className = componentBCss.footerContent

div.appendChild(div1)