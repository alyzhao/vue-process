<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal" router :default-active="activeNav">
        <el-menu-item v-for="nav in navLinks" :index="nav.name" :route="{path: nav.path}">{{nav.name}}</el-menu-item>
      </el-menu>
    </el-header>    
    <el-main>
      <router-view></router-view>      
    </el-main>
  </el-container>
</template>

<script>
import navLinks from '@/constants/nav-links'


export default {
  name: 'app',
  data() {
    let activeNav = this.$router.currentRoute.name
    console.log(activeNav)
    return {
      navLinks,
      activeNav, 
    }
  },
  mounted() {
    console.log(this.$router.currentRoute.name)
  }
}
</script>

