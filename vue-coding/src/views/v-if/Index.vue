<template>
  <div class="vue-api-v-if">
    <Cell>
      <el-divider content-position="left">条件渲染 和 列表渲染同时出现</el-divider>
      <ul>
        <li v-for="item in todoList" v-if="!item.isComplete" :key="item.id" >{{item.text}}</li>
      </ul>
    </Cell>

    <Cell>
      <el-divider content-position="left">计算属性排序会改变原始数据么?</el-divider>
      <p><strong><em>直接用sort会改变原来的数组, 所以用slice拷贝一份数组</em></strong></p>
      <ul>
        <li v-for="item in sortList" v-if="!item.isComplete" :key="item.id" >{{item.text}}</li>
      </ul>
    </Cell>
  </div>
</template>
<script>
  export default {
    data() {
      console.log(this.$set)

      return {
        todoList: [{
          id: 1,
          isComplete: true,
          text: '1'
        }, {
          id: 2,
          isComplete: false,
          text: '2'
        }, {
          id: 3,
          isComplete: true,
          text: '3'
        }, {
          id: 4,
          isComplete: false,
          text: '4'
        }, {
          id: 5,
          isComplete: true,
          text: '5'
        }]
      }
    },
    computed: {
      sortList() {
        return this.todoList.slice(0).sort((x, y) => y.id - x.id)
      }
    }
  }
</script>