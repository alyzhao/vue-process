<template>
  <label>自定义组件上使用 v-model:
    <input :value="value" @input="$emit('input', $event.target.value)" />
  </label>
</template>
<script>
  export default {
    props: ['value'],
  }
</script>