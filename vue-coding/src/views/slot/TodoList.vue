<template>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <slot name="todo" :todo="todo">{{todo.text}}</slot>
    </li>
  </ul>
</template>
<script>
  export default {
    props: ['filteredTodos']
  }
</script>