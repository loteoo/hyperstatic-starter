const renderPages = require('hyperapp-site-generator/src/renderPages');

(async () => {
  let pages = [
    '/',
    '/about',
    '/counter'
  ]

  renderPages(pages)
    .then(() => {
      console.log('All pages rendered!')
      process.exit(0)
    })
})()
