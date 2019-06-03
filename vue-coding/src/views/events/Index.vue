<template>
  <div class="vue-api-events">
    <Cell>
      <el-divider content-position="left">内联处理器中访问原始的 DOM 事件</el-divider>
      <el-button @click="test('传入$event可以访问dom事件', $event)">$event</el-button>
    </Cell>

    <Cell>
      <el-divider content-position="left">事件修饰符</el-divider>
      <ul>
        <li><el-link type="warning" :underline="false">.stop</el-link> 阻止冒泡</li>
        <li><el-link type="warning" :underline="false">.prevent</el-link> 阻止默认事件</li>
        <li><el-link type="warning" :underline="false">.capture</el-link> 事件捕获模式</li>
        <li><el-link type="warning" :underline="false">.self</el-link> 只当在 event.target 是当前元素自身时触发处理函数</li>
        <li><el-link type="warning" :underline="false">.once</el-link> 点击事件将只会触发一次</li>
        <li><el-link type="warning" :underline="false">.passive</el-link> 对应 addEventListener 中 options 中的 passive(永远不会调用 preventDefault, 提高移动端性能)</li>
      </ul>
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