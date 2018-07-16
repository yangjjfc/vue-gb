'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    SERVER: '"http://scmp.dev.cloudyigou.com/gateway"',
    IMAGE_UPLOAD: '"http://scmp.dev.cloudyigou.com/gateway/upload"',
    IMAGE_DOWNLOAD: '"http://dfs.dev.cloudyigou.com/dfs/"',
    TITLEURL: '"/app"'
})
