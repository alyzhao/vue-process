<template>
  <div class="vue-api-slot">
    <Cell>
      <el-divider content-position="left">slot基本用法</el-divider>
      <Navigation url="https://cn.vuejs.org/v2/guide/components-slots.html">slot基本用法</Navigation> 
    </Cell>

    <Cell>
      <el-divider content-position="left">slot默认内容</el-divider>
      <Navigation url="https://cn.vuejs.org/v2/guide/components-slots.html"></Navigation> 
    </Cell>
  </div>
</template>
<script>
  import Navigation from './NavigationLink'
  import Cell from '@/components/Cell'

  export default {
    name: 'slot',
    components: {
      Navigation,
      Cell,
    }
  }
</script>