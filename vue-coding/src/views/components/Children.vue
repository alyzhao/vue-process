<template>
  <p>{{childrenName}} <button @click="$emit('add', 2)">add</button></p>
</template>
<script>
  export default {
    props: ['childrenName'],
  }
</script>