const path = require('path')
const isDev = think.env === 'development'

const cors = require('@koa/cors')

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  { handle: cors },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|upload|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb',
      uploadDir: path.join(think.ROOT_PATH, 'www/upload')
    }
  },
  {
    handle: 'router',
    options: {}
  },
  'logic',
  'controller'
]
