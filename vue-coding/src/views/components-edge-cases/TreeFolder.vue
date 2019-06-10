<template>
  <p>
    <span>{{ folder.name }}</span>
    <TreeFolderContents :children="folder.children"/>
  </p>
</template>
<script>

  export default {
    props: ['folder'],
    components: {
      TreeFolderContents: () => import('./TreeFolderContents')
    }
  }
</script>