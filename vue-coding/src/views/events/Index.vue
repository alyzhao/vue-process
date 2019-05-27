<template>
  <div class="vue-api-events">
    <Cell>
      <el-divider content-position="left">内联处理器中访问原始的 DOM 事件</el-divider>
      <el-button @click="test('传入$event可以访问dom事件', $event)">$event</el-button>
    </Cell>

    <Cell>
      <el-divider content-position="left">事件修饰符</el-divider>
      <p><a href="https://cn.vuejs.org/v2/guide/events.html" @click.prevent="prevent">prevent 修饰符, 阻止默认事件</a></p>
      <div @click.capture="propagation('outter')" style="padding: 20px 0;">
        <p @click="propagation('middle')">
          <button @click="propagation('inner')">stop 修饰符, 阻止事件冒泡传播, 冒泡即从触发的元素冒泡到 body -> html -> document</button>
        </p>
      </div>
    </Cell>

    <Cell>
      
    </Cell>
  </div>
</template>
<script>
  export default {
    methods: {
      test(str, event) {
        console.log(str)
        console.log(event)
      },
      prevent() {
        console.log('阻止默认事件, 相当于调用了 e.target.preventDefault()')
      },
      propagation(text) {
        console.log(text)
      }
    }
  }
</script>