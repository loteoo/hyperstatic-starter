const http = require('http')
const handler = require('serve-handler')

const createStaticServer = (port, distFolder) =>
  http.createServer((request, response) =>
    handler(request, response, {
      public: distFolder,
      rewrites: [
        { source: '**/*', 'destination': '/index.html' }
      ]
    })
  ).listen(port)


createStaticServer(5000, 'dist')