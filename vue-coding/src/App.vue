<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal" router :default-active="activeNav">
        <el-menu-item v-for="nav in navLinks" :index="nav.name" :route="{path: nav.path}">{{nav.name}}</el-menu-item>
      </el-menu>
    </el-header>    
    <el-main>
      <div>{{arr}} <button @click="test">test</button></div>
      <router-view></router-view>      
    </el-main>
  </el-container>
</template>

<script>
import navLinks from '@/constants/nav-links'


export default {
  name: 'app',
  created() {
    console.log(this.$options)
    console.log(this.navLinks)
    // this.arr[0] = 5
  },
  data() {
    let activeNav = this.$router.currentRoute.name
    console.log(this)
    return {
      navLinks,
      activeNav,
      arr: [1, 2, 3]
    }
  },
  methods: {
    test() {
      this.$set(this.arr, 0, 5)
    }
  }
}
</script>
<style lang="scss">
  pre {
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 13px;
    height: 100%;
    line-height: 16px;
    white-space: pre;
  }

  .guess {
    font-size: 12px;
    color: #e8c289;
  }
</style>

