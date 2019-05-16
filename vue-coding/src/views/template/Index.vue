<template>
  <div class="vue-api-template">
    <Cell>
      <el-divider content-position="left">特性 v-bind</el-divider>
      <button v-bind:disabled="isDisable">v-bind 的值是 null, undefined, 或 false 时, disabled 特性不会渲染</button>
    </Cell>

    <Cell>
      <el-divider content-position="left">指令 动态参数</el-divider>
      
      <a v-bind:[bar]="value">{{value}}</a>
    </Cell>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        isDisable: null,
        value: 'https://cn.vuejs.org/v2/guide/syntax.html',
        bar: 'href'
      }
    }
  }
</script>