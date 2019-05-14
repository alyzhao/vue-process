<template>
  <a :href="url" class="nav-link"><slot>这是默认内容</slot></a>
</template>
<script>
  export default {
    props: ['url']
  }
</script>
<style lang="scss">
  .nav-link {
    color: #409EFF;
  }
</style>