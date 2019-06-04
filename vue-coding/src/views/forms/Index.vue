<template>
  <div class="vue-api-events">
    <Cell>
      <el-divider content-position="left">多个复选框，绑定到同一个数组</el-divider>
      <div>
        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>
        <br>
        <span>Checked names: {{ checkedNames }}</span>
      </div>

    </Cell>

    <Cell>
      <el-divider content-position="left">
        v-model 修饰符
      </el-divider>

      <CodeItems :items="items"></CodeItems>

      <p><el-link type="warning" :underline="false">.lazy</el-link>使用 change 事件进行同步<input v-model.lazy="msg" /> {{msg}}</p>

      <p><el-link type="warning" :underline="false">.number</el-link><input v-model.number="age" type="number"></p>
    </Cell>

  </div>
</template>
<script>
  import CodeItems from '@/components/CodeItems'

  export default {
    components: {
      CodeItems
    },
    data() {
      return {
        items: [{
          code: '.lazy',
          des: '使用 change 事件进行同步'
        }, {
          code: '.number',
          des: '自动将用户的输入值转为数值类型'
        }, {
          code: '.trim',
          des: '自动过滤用户输入的首尾空白字符'
        }],
        checkedNames: [],
        msg: '',
        age: '',
      }
    }
  }
</script>