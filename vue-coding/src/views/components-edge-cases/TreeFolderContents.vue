<template>
  <ul>
    <li v-for="child in children">
      <TreeFolder v-if="child.children" :folder="child" />
      <span v-else>{{ child.name }}</span>
    </li>
  </ul>
</template>
<script>
  import TreeFolder from './TreeFolder'

  export default {
    components: {
      TreeFolder
    },
    props: ['children']
  }
</script>