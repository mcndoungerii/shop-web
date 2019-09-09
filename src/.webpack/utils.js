'use strict'

const path = require('path')

module.exports = {
  resolve: function (dir) {
    return path.join(__dirname, '..', dir)
  },

  assetsPath: function (_path) {
    const assetsSubDirectory = 'src/assets'
    return path.posix.join(assetsSubDirectory, _path)
  }
}
