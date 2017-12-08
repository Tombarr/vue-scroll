# vue-wheel
wheel directive for [vuejs 2.0](https://vuejs.org/v2/guide/)

Just use native event handlers like:

```
<template>
  <ul v-on:wheel="onWheel">
    <li></li>
  </ul>
</template>
```

## Installation
### NPM (recommended)
```
npm install vuewheel --save
```
### Standalone

Simple download from [releases](https://github.com/Tombarr/vue-wheel/releases) and include it in script tag.

## Get started

```javascript
import Vue from 'vue'
import vuewheel from 'vuewheel'

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
