<template>
  <ul>
    <li v-for="item in items">
      <el-link type="warning" :underline="false">{{item.code}}</el-link>
      {{item.des}}
      <CodeItems v-if="item.children" :items="item.children" />
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'CodeItems',
    props: ['items']
  }
</script>