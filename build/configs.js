const path = require('path')
const buble = require('rollup-plugin-buble')
const flow = require('rollup-plugin-flow-no-whitespace')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const strip = require('rollup-plugin-strip')
const version = process.env.VERSION || require('../package.json').version
const banner =
`/**
  * vue-wheel v${version}
  * (c) ${new Date().getFullYear()} Thomas Barrasso
  * @license MIT
  */`

const resolve = _path => path.resolve(__dirname, '../', _path)

module.exports = [
  // browser dev
  {
    file: resolve('dist/vue-wheel.js'),
    format: 'umd',
    env: 'development'
  },
  {
    file: resolve('dist/vue-wheel.min.js'),
    format: 'umd',
    env: 'production'
  },
  {
    file: resolve('dist/vue-wheel.common.js'),
    format: 'cjs'
  },
  {
    file: resolve('dist/vue-wheel.esm.js'),
    format: 'es'
  }
].map(genConfig)

function genConfig (opts) {
  const config = {
    input: {
      input: resolve('src/index.js'),
      plugins: [
        flow(),
        node(),
        cjs(),
        replace({
          __VERSION__: version
        }),
        buble(),
        strip({
          // set this to `false` if you don't want to
          // remove debugger statements
          debugger: true,
    
          // defaults to `[ 'console.*', 'assert.*' ]`
          functions: [ 'console.log', 'assert.*', 'debug', 'alert' ],
    
          // set this to `false` if you're not using sourcemaps –
          // defaults to `true`
          sourceMap: true
        })
      ]
    },
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: 'VueWheel'
    }
  }

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  } else {
    config.input.external = [ 'lodash' ]
  }

  return config
}