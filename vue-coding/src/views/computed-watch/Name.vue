<template>
  <div>
    <p>firstName: {{firstName}}</p>
    <p>lastName: {{lastName}}</p>
    <el-row>
      <el-col :span="4">fullName: {{fullName}}</el-col>
      <el-col :span="10">
        <el-input v-model="inputData" @blur="fullName = inputData"></el-input>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        firstName: 'Allen',
        lastName: 'Zhao',
        inputData: ''        
      }
    },
    computed: {
      fullName: {
        get() {
          return this.firstName + ' ' + this.lastName
        },
        set(newValue) {
          let names = newValue.split(' ')
          this.firstName = names[0]
          this.lastName = names[1]
        }
      }
    }
  }
</script>