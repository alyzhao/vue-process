export default {
  data() {
    return {
      name: 'mixin'
    }
  },
  created() {
    this.sayHi()
  },
  mounted() {
    this.sayHi()
  },
  methods: {
    sayHi() {
      console.log('hi ' + this.name)
    }
  }
}