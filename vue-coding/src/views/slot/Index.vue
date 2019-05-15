<template>
  <div class="vue-api-slot">
    <Cell>
      <el-divider content-position="left">slot基本用法</el-divider>
      <Navigation url="https://cn.vuejs.org/v2/guide/components-slots.html">slot基本用法</Navigation> 
    </Cell>

    <Cell>
      <el-divider content-position="left">slot默认内容</el-divider>
      <Navigation url="https://cn.vuejs.org/v2/guide/components-slots.html"></Navigation> 
    </Cell>

    <Cell>
      <el-divider content-position="left">具名插槽</el-divider>
      <BaseLayout>
        <h1 slot="header">这是 name 为 header 的插槽</h1>
        <p>这是默认的插槽, 既 name 为 default, 2.6.0 之后的版本可以用废弃的语法, 直接 slot="slotName"</p>
        <h1 slot="footer">这是 name 为 footer 的插槽</h1>
      </BaseLayout>

      <BaseLayout>
        <template v-solt:header>
          <h1>这是 2.6.0 + 具名插槽写法, template 中使用指令 v-solt:header</h1>          
        </template>
        <template>
          <p>默认插槽的指令 v-solt:default 可以省略不写</p>
        </template>
        <p>任何没有被包裹在带有 v-slot 的 &lt;template&gt; 中的内容都会被视为默认插槽的内容。</p>
        <template v-solt:footer>
          <h1> v-solt:footer 具名插槽 footer</h1>
        </template>
      </BaseLayout>
    </Cell>

    <Cell>
      <el-divider content-position="left">作用域插槽</el-divider>
      <CurrentUser :user="{firstName: 'Allen', lastName: 'Zhao'}">
        <template v-slot:default="userInfo">
          {{userInfo.user.firstName}}
          <p>父组件可以访问子组件中的插槽 prop</p>
        </template>
      </CurrentUser>
    </Cell>

    <Cell>
      <el-divider content-position="left">独占默认插槽的缩写语法</el-divider>
      <CurrentUser :user="{firstName: 'Allen', lastName: 'Zhao'}" v-slot="userInfo">
        <h3>{{userInfo.user.firstName}} 当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。</h3>
      </CurrentUser>
    </Cell>

    <Cell>
      <el-divider content-position="left">解构插槽 Prop</el-divider>
      <CurrentUser :user="{firstName: 'Allen', lastName: 'Zhao'}" v-slot="{user}">
        <i>{{user.firstName}} 作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里 </i>
      </CurrentUser>
      <p></p>
      <CurrentUser :user="{firstName: 'Allen', lastName: 'Zhao'}" v-slot="{ user: person }">
        {{ person.firstName }} 可以重命名
      </CurrentUser>
      <p></p>
      <CurrentUser :user="{lastName: 'Zhao'}">
        <template v-slot:other="{ user = {firstName: 'Guest'} }">
          <strong> {{ user.firstName }} 可以设置默认参数, 用于插槽 prop 是 undefined 的情形, 这种情形实在子组件 没有提供 插槽props 并且必须用 &lt;templete&gt; 包裹起来, 限制条件太多了, 不实用!</strong>          
        </template>
      </CurrentUser>
    </Cell>

    <Cell>
      <el-divider content-position="left">动态插槽名以及具名插槽的缩写</el-divider>
      <BaseLayout>
        <template v-slot:[dynamicSlotName]>
          这是一个动态 slot 名 
        </template>
        <template #default>
          该缩写只在其有参数的时候才可用 所以必须写成 #default
        </template>
        <template #footer>
          footer
        </template>
      </BaseLayout>
    </Cell>

    <Cell>
      <el-divider content-position="left">插槽示例</el-divider>
      <el-alert>
        <template #title>常见用法</template>
        <template #default>访问子元素作用域的数据, 从而定制化组件, 循环功能都差不多, 但是要根据每一项数据的值进行过滤判断之类的, 作用域插槽能发挥用处</template>
      </el-alert>
      <TodoList :filteredTodos="filteredTodos">
        <template #todo="{todo}">
          <span v-if="todo.isComplete">✓</span>
          {{todo.text}}
        </template>
      </TodoList>
    </Cell>


  </div>
</template>
<script>
  import Cell from '@/components/Cell'

  import TestComponent from './TestComponent'
  import Navigation from './NavigationLink'
  import BaseLayout from './BaseLayout'
  import CurrentUser from './CurrentUser'
  import TodoList from './TodoList'

  export default {
    name: 'slotComponent',
    components: {
      Navigation,
      Cell,
      BaseLayout,
      CurrentUser,
      TestComponent,
      TodoList,
    },
    data() {
      return {
        filteredTodos: [{
          id: 1,
          text: 'todo1',
          isComplete: false
        }, {
          id: 2,
          text: 'todo2',
          isComplete: false
        }, {
          id: 3,
          text: 'todo3',
          isComplete: true
        }, {
          id: 4,
          text: 'todo4',
          isComplete: true
        }, {
          id: 5,
          text: 'todo5',
          isComplete: false
        }]
      }
    },
    computed: {
      dynamicSlotName() {
        return 'header'
      }
    }
  }
</script>