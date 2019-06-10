<template>
  <span>
    {{RecursiveData}}
    <Recursive v-if="RecursiveData / 2 > 1" :RecursiveData="Math.floor(RecursiveData / 2)" />
  </span>
</template>
<script>
  export default {
    name: 'Recursive',
    component: {
      Recursive: 'Recursive',
    },
    props: ['RecursiveData']
  }
</script>