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


  </div>
</template>
<script>
  import Cell from '@/components/Cell'

  import Navigation from './NavigationLink'
  import BaseLayout from './BaseLayout'
  import CurrentUser from './CurrentUser'

  export default {
    name: 'slotComponent',
    components: {
      Navigation,
      Cell,
      BaseLayout,
      CurrentUser,
    },
    data() {
      return {

      }
    }
  }
</script>