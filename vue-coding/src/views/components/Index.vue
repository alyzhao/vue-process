<template>
  <div class="vue-api-component">
    <Cell>
      <el-divider content-position="left">监听子组件事件</el-divider>
      <el-link type="danger" :underline="false">子组件通过 $emit 的第二个参数抛出参数, 父组件通过 $event 接受这个参数</el-link>
      <el-link type="danger" :underline="false">如果事件处理函数是一个方法, 抛出的值将会作为第一个参数传入这个方法</el-link>      
      <Children childrenName="组件事件" @add="count += $event"></Children> {{count}}
    </Cell>

    <Cell>
      <el-divider content-position="left">自定义组件上使用 v-model</el-divider>
      <ul>
        <li>将其 value 特性绑定到一个名叫 value 的 prop 上</li>
        <li>在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出(默认是 input 事件), 实际上 v-model 只是自动监听了 input 事件</li>
        <li>按照文档的描述:  默认会利用名为 value 的 prop 和名为 input 的事件</li>
      </ul>
      <Model v-model="testModel"></Model>{{testModel}}
    </Cell>

    <Cell>
      <el-divider content-position="left">自定义组件不使用 value prop, 和 input 事件(实质上只是改变了 自定义事件 input 的名称, 以及改变了注入的 prop)</el-divider>
      <el-link type="warning" :underline="false">实际上只是 用 $emit 触发了这个 input 自定义事件, v-model 接收了这个参数, 并修改了绑定的值</el-link>
      <p>
        <CheckModel v-model="checkedValue"></CheckModel> {{checkedValue}}        
      </p>
    </Cell>

    <Cell>
      <el-divider content-position="left">动态组件, 通过 Vue 的 &lt;component&gt; 元素加一个特殊的 is 特性来实现</el-divider>
      <input type="radio" v-model="componentValue" value="Children" id="Children" /><label for="Children">Children</label>
      <input type="radio" v-model="componentValue" value="Model" id="Model" ><label for="Model">Model</label>
      <p>
        <component :is="componentValue"></component>
      </p>
    </Cell>

  </div>
</template>
<script>
  import Children from './Children'
  import Model from './Model'
  import CheckModel from './CheckModel'

  export default {
    components: {
      Children,
      Model,
      CheckModel,
    },
    data() {
      return {
        count: 0,
        testModel: '',
        checkedValue: '',
        componentValue: ''
      }
    },
    methods: {
      checkboxValue() {
        console.log(document.querySelector('#checkbox-test').value)
      }
    }
  }
</script>