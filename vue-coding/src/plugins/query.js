export default class vueQuery {
  static install (Vue, options) {
    Vue.prototype.$getAllParams = Vue.getAllParams = () => {
      let exp = /[?&]([^?&]*)=([^?&]*)/g
      let search = location.search
      let match = exp.exec(search)
      let s = {}
      while (match) {
        s[match[1]] = match[2]
        match = exp.exec(search)
      }
      return s
    }


    // Vue.mixin({
    //   created: () => console.log('vue-query has been installed!')
    // })
  }
}