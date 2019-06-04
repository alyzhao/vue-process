<template>
  <label>使用 checked 属性: <input type="checkbox" :checked="checked" @change="change($event)"></label>
</template>
<script>
  export default {
    props: ['checked'],
    // model 选项仅仅是可以让用户改变 proo 和 自定义事件的名称, 其他没有任何luan用
    model: {
      prop: 'checked',
      event: 'change'
    },
    methods: {
      // 实际上 $event 只是模版里面能访问的变量, 现在传入 函数当中
      change ($event) {
        this.$emit('change', $event.target.checked)
      }
    }
  }
</script>