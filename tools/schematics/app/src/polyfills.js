/**
 * Polyfill stable language features. These imports will be optimized by `@babel/preset-env`.
 *
 * See: https://github.com/zloirock/core-js#babel
 */
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// Dev only console logs
if (window) {
  window.log = function () {
    if (
      process.env.NODE_ENV.indexOf('dev') === 0 ||
      window.location.host.indexOf('stage') > 0
    ) {
      console.log(...arguments)
    }
  }
}
