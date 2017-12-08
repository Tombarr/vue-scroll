import _ from 'lodash'

export default (function () {
  const elements = [];
  const listeners = new Map();

  const WHEEL = 'wheel';

  function addEventListener (element, event, funcs, opt) {

    function fn (e) {
      let data;
      let target = e.target || e.srcElement;
      e = e || window.e;

      funcs.forEach(function (f) {
        f(e, data);
      })
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
    
    let funcs, eventFuncs;

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

    let funcs, eventFuncs;

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
      eventFuncs.splice(eventFuncs.indexOf(fn), 1)
      return true;
    }

    return false;

  }

  return {
    bind: bind,
    unbind: unbind
  }

})()