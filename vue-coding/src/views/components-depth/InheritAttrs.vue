<template>
  <label>
    {{label}}
    <input
      v-bind="$attrs"
      v-bind:value="value"
      v-on="inputListeners"
      v-on:input="$emit('input', $event.target.value)"
    />
  </label>
</template>
<script>
  export default {
    inheritAttrs: false,
    props: ['value', 'label'],
    mounted() {
      console.log(this.$attrs)
      console.log(this.$listeners)
    },
    computed: {
      inputListeners: function() {
        return Object.assign({},
          // 我们从父级添加所有的监听器
          this.$listeners,
          // 然后我们添加自定义监听器，
          // 或覆写一些监听器的行为
          {
            // 这里确保组件配合 `v-model` 的工作
            // 如果没有这个的话, v-model 不起作用
            input: (event) => {
              this.$emit('input', event.target.value)
            }
          }
        )
      }
    }
  }
</script>