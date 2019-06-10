<template>
  <div class="vue-api-components-depth">
    <Cell>
      <el-divider content-position="left">Prop类型</el-divider>
      <p class="guess">可以是任意的构造函数, 通过 instanceof 来进行检查确认</p>
      <pre>
        props: {
          title: String,
          likes: Number,
          isPublished: Boolean,
          commentIds: Array,
          author: Object,
          callback: Function,
          contactsPromise: Promise // or any other constructor
        }
      </pre>
    </Cell>

    <Cell>
      <el-divider content-position="left">传入一个对象的所有属性 v-bind="object" 传入 object 的所有属性</el-divider>
      <Children v-bind="testProps"></Children>
    </Cell>

    <Cell>
      <el-divider content-position="left">Prop 验证</el-divider>
      <pre>
        Vue.component('my-component', {
          props: {
            // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
            propA: Number,
            // 多个可能的类型
            propB: [String, Number],
            // 必填的字符串
            propC: {
              type: String,
              required: true
            },
            // 带有默认值的数字
            propD: {
              type: Number,
              default: 100
            },
            // 带有默认值的对象
            propE: {
              type: Object,
              // 对象或数组默认值必须从一个工厂函数获取
              default: function () {
                return { message: 'hello' }
              }
            },
            // 自定义验证函数
            propF: {
              validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['success', 'warning', 'danger'].indexOf(value) !== -1
              }
            }
          }
        })
      </pre>
    </Cell>

    <Cell>
      <el-divider content-position="left">禁用特性继承</el-divider>      
      <p class="guess">没有写入到 prop 中的属性会被继承到根组件上, 使用 inheritAttrs: false 之后就不会, 并且在子组件中 $attrs 属性可以访问这些未被继承的属性</p>
      <InheritAttrs v-model="inheriteData" label="禁止继承" placeholder="输入内容" required />
    </Cell>

    <Cell>
      <el-divider content-position="left">将原生事件绑定到组件</el-divider>
      <el-link type="warning" :underline="false">.native</el-link> 不能解决的是, 当组件的根元素不是想要添加事件的情况时
      <p>Vue 提供了一个 <el-link type="warning" :underline="false">$listeners</el-link> 属性，它是一个对象，里面包含了作用在这个组件上的所有监听器</p>

      <InheritAttrs @focus="focusHandle" v-model="inheriteData2" label="$listeners" placeholder="$listeners可以将组件上绑定的事件传入" required @input="inputHandle" style="width: 200px" /> {{inheriteData2}}
    </Cell>

    <Cell>
      <el-divider content-position="left">.sync修饰符</el-divider>
      <p class="guess">实际上就是 父组件 注册了自定义 update:propName 事件, 子组件在修改 props 时 $emit('update:propName', newValue)</p>
      <p class="guess"> .sync 只是一个简写, 相当于 @update:propName, 在子组件中仍然需要 $emit('update:propName', newValue) 触发 </p>
      <SyncChildren :count.sync="syncCount" /> 
      <p>父组件 syncCount: {{syncCount}}<p/>
    </Cell>

    <Cell>
      <el-divider content-position="left">动态组件 &lt;keep-alive&gt; 异步组件</el-divider>
      <p class="guess">使用 &lt;keep-alive&gt; 缓存组件状态</p>

      <input type="radio" v-model="componentValue" value="DynamicChildren" id="DynamicChildren" /><label for="DynamicChildren">DynamicChildren</label>
      <input type="radio" v-model="componentValue" value="DynamicModel" id="DynamicModel" ><label for="DynamicModel">DynamicModel</label>

      <p>
        <keep-alive>
          <component :is="componentValue"></component>
        </keep-alive>
      </p>
    </Cell>

  </div>
</template>
<script>
  import Children from './Children'
  import InheritAttrs from './InheritAttrs'
  import SyncChildren from './SyncChildren'

  import DynamicChildren from '../components/Children'
  


  export default {
    components: {
      Children,
      InheritAttrs,
      SyncChildren,

      DynamicChildren,
      DynamicModel: () => import('../components/Model'),  // 引入一个异步组件
    },
    data() {
      return {
        testProps: {
          a: 1,
          b: false,
          c: 'test'
        },
        inheriteData: '',
        inheriteData2: '',
        syncCount: 0,
        componentValue: ''
      }
    },
    methods: {
      focusHandle() {
        console.log('focus $listeners')
      },
      inputHandle() {
        console.log('input $listeners')        
      }
    }
  }
</script>