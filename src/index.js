import _ from 'lodash'
import dom from './domEvent'

const vuewheel = new Object;

vuewheel.install = function (Vue, options) {

  options = options || {};
  const WHEEL = 'wheel';

  function bindValue (el, value, arg) {
    let fn, opt = Object.assign({}, options);
    if (_.isObject(value) || _.isFunction(value)) {
      fn = value;

      try {
        dom.bind(el, WHEEL, fn, opt);
      } catch(err) {
        console.warn('Unexpected error happened when binding listener');
      }
      
    } else {
      console.warn('Unexpected wheel properties');
    }
  }

  function unbindValue (el, value, arg) {
    let fn;
    if (_.isObject(value) || _.isFunction(value)) {
      fn = value;

      dom.unbind(el, WHEEL, fn);
    }
  }

  Vue.directive(WHEEL, {

    bind: function(el, binding, vnode, oldVnode) {
      bindValue(el, binding.value, binding.arg);
    },

    inserted: function(el, binding) {
        // To do, check whether element is scrollable and give warn message when not
    },

    update: function(el, binding) {
      if (binding.value === binding.oldValue) {
        return;
      }
      bindValue(el, binding.value, binding.arg);
      unbindValue(el, binding.oldValue, binding.arg);
    },

    unbind: function(el, binding) {
      unbindValue(el, binding.value, binding.arg);
    }

  })

}

export default vuewheel;

