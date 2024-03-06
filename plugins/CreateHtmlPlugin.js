// 需要使用transformIndexHtml
// 转换html的专用钩子

module.exports = (options) => {
  return {
    transformIndexHtml: {
      order: 'pre',
      handler: (html, ctx) => {
        const {
          inject
        } = options
  
        const {
          data
        } = inject
  
        return html.replace(/<%= title %>/g, data.title)
      }
    }
  }
}