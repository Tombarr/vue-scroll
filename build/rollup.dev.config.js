// rollup.config.js
import path from 'path';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/vue-wheel.dev.js',
    format: 'cjs'
  },
  external: [
    'lodash'
  ]
}