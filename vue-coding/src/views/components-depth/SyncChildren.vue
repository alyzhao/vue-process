<template>
  <p>
    {{count}}
    <button @click="add">add +1</button>
  </p>
</template>
<script>
  export default {
    props: ['count'],
    methods: {
      add() {
        this.$emit('update:count', this.count + 1)
      }
    }
  }
</script>