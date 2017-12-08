/**
  * vue-wheel v2.1.6
  * (c) 2017 Thomas Barrasso
  * @license MIT
  */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _ = _interopDefault(require('lodash'));

var dom = (function () {
  var listeners = new Map();

  var WHEEL = 'wheel';

  function addEventListener (element, event, funcs, opt) {

    function fn (e) {
      var data;
      var target = e.target || e.srcElement;
      e = e || window.e;

      funcs.forEach(function (f) {
        f(e, data);
      });
    }
    
    // https://github.com/Tombarr/vue-wheel/issues/1
    if (event === WHEEL) {
      if (element === document.body || element === document || element === window) {
        document.onscroll = fn;
      } else {
        if (element.addEventListener) {
          element.addEventListener(event, fn);
        } else {
          element.attachEvent('on' + event, fn);
        }
      }
    }

  }
  

  function bind (element, event, fn, opt) {
    
    var funcs, eventFuncs;

    if (!_.isFunction(fn)) {
      throw new Error('Wheel handler is not a function');
    }

    if (!listeners.has(element)) {
      listeners.set(element, new Map());
    }
       
    funcs = listeners.get(element);
     
    if (!funcs.has(event)) {
      funcs.set(event, []);
    }

    eventFuncs = funcs.get(event);

    if (!eventFuncs.length) {
      addEventListener(element, event, eventFuncs, opt);
    }
    
    eventFuncs.push(fn);

  }

  function unbind (element, event, fn) {

    var funcs, eventFuncs;

    if (!_.isFunction(fn)) {
      return;
    }

    if (!listeners.has(element)) {
      listeners.set(element, new Map());
    }

    funcs = listeners.get(element);
     
    if (!funcs.has(event)) {
      funcs.set(event, []);
    }

    eventFuncs = funcs.get(event);

    if (eventFuncs.indexOf(fn) > -1) {
      eventFuncs.splice(eventFuncs.indexOf(fn), 1);
      return true;
    }

    return false;

  }

  return {
    bind: bind,
    unbind: unbind
  }

})();

var vuewheel = new Object;

vuewheel.install = function (Vue, options) {

  options = options || {};
  var WHEEL = 'wheel';

  function bindValue (el, value, arg) {
    var fn, opt = Object.assign({}, options);
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
    var fn;
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

  });

};

module.exports = vuewheel;
