<template>
  <p>inject data ==> a: {{provideData.a}}, b: {{provideData.b}}, c: {{provideData.c}}</p>
</template>
<script>
  export default {
    inject: ['provideData']
  }
</script>