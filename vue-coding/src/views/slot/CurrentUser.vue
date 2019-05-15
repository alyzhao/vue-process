<template>
  <span>
    <slot v-bind:user="user">{{user.lastName}}</slot>
    <slot name="other"></slot>
  </span>
</template>
<script>
  export default {
    props: ['user'],
    data() {
      return {
        soltProps: {
          p: 'this property is slotProps'
        }
      }
    }
  }
</script>