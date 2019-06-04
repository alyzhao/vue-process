<template>
  <div class="vue-api-components-depth">
    <Cell>
      <el-divider content-position="left">Prop类型</el-divider>
      <p class="guess">可以是任意的构造函数, 估计是使用 instanceof 判断的</p>
      <pre>
        props: {
          title: String,
          likes: Number,
          isPublished: Boolean,
          commentIds: Array,
          author: Object,
          callback: Function,
          contactsPromise: Promise // or any other constructor
        }
      </pre>
    </Cell>

    <Cell>
      <el-divider content-position="left">传入一个对象的所有属性</el-divider>
      <Children v-bind="testProps"></Children>
    </Cell>
  </div>
</template>
<script>
  import Children from './Children'

  export default {
    components: {
      Children,
    },
    data() {
      return {
        testProps: {
          a: 1,
          b: false,
          c: 'test'
        }
      }
    }
  }
</script>