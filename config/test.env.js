let merge = require('webpack-merge');
let devEnv = require('./dev.env');

module.exports = merge(devEnv, {
  BUILD_NO: '"Localhost"',
});
