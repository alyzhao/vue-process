<template>
  <div class="vue-api-computed-watch">
    <Cell>
      <el-divider content-position="left">计算属性的 setter</el-divider>
      <Name />
    </Cell>
  </div>
</template>
<script>
  import Name from './Name.vue'

  export default {
    components: {
      Name,
    }
  }
</script>