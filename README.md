# vue-wheel
wheel directive for [vuejs 2.0](https://vuejs.org/v2/guide/)

## Installation
### NPM (recommended)
```
npm install vue-wheel --save
```
### Standalone

Simple download from [releases](https://github.com/Tombarr/vue-wheel/releases) and include it in script tag.

## Get started

```javascript
import Vue from 'vue'
import vuewheel from 'vue-wheel'

Vue.use(vuewheel)
```

Directive v-wheel then can be used in any of your Component.

```App.vue
<template>
  <ul v-wheel="onWheel">
    <li></li>
  </ul>
</template>
...
```

Method onWheel receives the native event,

* e - event

## LICENSE
MIT
