<template>
  <p>a: {{a}}, b: {{b}}, c: {{c}}</p>
</template>
<script>
  export default {
    props: {
      a: Number,
      b: Boolean,
      c: String
    }
  }
</script>