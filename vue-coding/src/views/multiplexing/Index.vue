<template>
  <div class="vue-api-multiplexing">
    <Cell>
      <el-divider content-position="left">混入</el-divider>
      <p>
        <el-alert :closable="false">一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。</el-alert>
      </p>
      <Children />

      <p>
        <el-alert :closable="false" type="warning">请谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项。推荐将其作为插件发布，以避免重复应用混入。</el-alert>
      </p>

      <p>
        <el-alert :closable="false" type="error">数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。同名钩子函数将合并为一个数组，因此都将被调用。 另外，混入对象的钩子将在组件自身钩子之前调用。 值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。</el-alert>
      </p>
    </Cell>

    <Cell>
      <el-divider content-position="left">自定义指令</el-divider>

      <input v-focus:foo="1 + 1" placeholder="自定义指令, 获得焦点" style="width: 250px;display: inline-block;" />

      <h3>自定义指令钩子函数</h3>
      <CodeItems :items="directivesHook" />

      <h3>自定义指令钩子函数参数</h3>
      <CodeItems :items="hookParams"></CodeItems>

      <el-alert :closable="false" type="error">除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。</el-alert>

      <p>
        <pre>
          // 函数简写, 在 bind 和 update 时触发相同行为
          Vue.directive('color-swatch', function (el, binding) {
            el.style.backgroundColor = binding.value
          })
        </pre>
      </p>

      <el-alert :disable="false">如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。</el-alert>
    </Cell>

    <Cell>
      <el-divider content-position="left">插件</el-divider>

      <p>
        <el-alert :closable="false">Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象</el-alert>
      </p>

      <pre>
        MyPlugin.install = function (Vue, options) {
          // 1. 添加全局方法或属性
          Vue.myGlobalMethod = function () {
            // 逻辑...
          }

          // 2. 添加全局资源
          Vue.directive('my-directive', {
            bind (el, binding, vnode, oldVnode) {
              // 逻辑...
            }
            ...
          })

          // 3. 注入组件选项
          Vue.mixin({
            created: function () {
              // 逻辑...
            }
            ...
          })

          // 4. 添加实例方法
          Vue.prototype.$myMethod = function (methodOptions) {
            // 逻辑...
          }
        }
      </pre>

    </Cell>
  </div>
</template>
<script>
  import Children from './Children'
  import mixin from './mixin'
  import CodeItems from '@/components/CodeItems'

  export default {
    mixins: [mixin],
    components: {
      Children,
      CodeItems,
    },
    data() {
      return {
        name: 'merge mixin',
        directivesHook: [{
          code: 'bind',
          des: '只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。'
        }, {
          code: 'inserted',
          des: '被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。'
        }, {
          code: 'update',
          des: '所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。'
        }, {
          code: 'componentUpdated',
          des: '指令所在组件的 VNode 及其子 VNode 全部更新后调用。'
        }, {
          code: 'unbind',
          des: '只调用一次，指令与元素解绑时调用。'
        }],
        hookParams: [{
          code: 'el',
          des: '指令所绑定的元素，可以用来直接操作 DOM 。'
        }, {
          code: 'binding',
          des: '一个对象，包含以下属性：',
          children: [{
            code: 'name',
            des: '指令名，不包括 v- 前缀。'
          }, {
            code: 'value',
            des: '指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。'
          }, {
            code: 'oldValue',
            des: '指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。'
          }, {
            code: 'expression',
            des: '字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。'
          }, {
            code: 'arg',
            des: '传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"'
          }, {
            code: 'modifiers',
            des: '一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }'
          }]
        }, {
          code: 'vnode',
          des: 'Vue 编译生成的虚拟节点。'
        }, {
          code: 'oldVnode',
          des: '上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用'
        }]
      }
    },
    created() {
      console.log(this.$getAllParams())
    },
    directives: {
      focus: {
        bind: (el, binding, vnode, oldVnode) => {
          console.log(el)
          console.log(binding)
          console.log(vnode)
          console.log(oldVnode)
        },
        inserted: el => {
          el.focus()
        }
      }
    }
  }
</script>