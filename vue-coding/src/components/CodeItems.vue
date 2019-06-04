<template>
  <ul>
    <li v-for="item in items">
      <el-link type="warning" :underline="false">{{item.code}}</el-link>
      {{item.des}}
    </li>
  </ul>
</template>
<script>
  export default {
    props: ['items']
  }
</script>