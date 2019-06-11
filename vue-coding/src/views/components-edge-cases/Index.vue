<template>
  <div class="vue-api-components-dege-cases">
    <Cell>
      <el-divider content-position="left">访问元素 & 组件</el-divider>
      <p>
        <el-link type="danger" :underline="false">$root</el-link>
        访问根组件
      </p>

      <p>
        <el-link type="danger" :underline="false">$parent</el-link>
        访问父组件
      </p>

      <p>
        <el-link type="danger" :underline="false">ref</el-link>
        访问子组件
      </p>
      <p class="guess">当 ref 和 v-for 一起使用的时候，你得到的引用将会是一个包含了对应数据源的这些子组件的数组</p>

    </Cell>

    <Cell>
      <el-divider content-position="left">依赖注入</el-divider>

      <p>
        <el-link type="danger" :underline="false">provide</el-link> 选项允许我们指定我们想要提供给后代组件的数据/方法，
        在任何后代组件里，我们都可以使用 <el-link type="danger" :underline="false">inject</el-link> 选项来接收指定的我们想要添加在这个实例上的属性
      </p>

      <p><el-link type="danger" :underline="false">provide</el-link> 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性</p>

      <p>
        <el-link type="danger" :underline="false">inject</el-link> 选项应该是：
        <ul>
          <li>一个字符串数组，或</li>
          <li>一个对象，对象的 key 是本地的绑定名，value 是:</li>
          <ul>
            <li>在可用的注入内容中搜索用的 key (字符串或 Symbol)，或</li>
            <li>一个对象，该对象的：</li>
            <ul>
              <li>from 属性是在可用的注入内容中搜索用的 key (字符串或 Symbol)</li>
              <li>default 属性是降级情况下使用的 value</li>
            </ul>
          </ul>
        </ul>
      </p>

      <InjectChild />
    </Cell>

    <Cell>
      <el-divider content-position="left">程序化的事件侦听器</el-divider>
      <CodeItems :items="eventListener" />

      <Event /> <button @click="offTestEvent">off event</button> <button id="addEventListener">addEventListener</button>
    </Cell>

    <Cell>
      <el-divider content-position="left">递归组件</el-divider>

      <p class="guess">组件是可以在它们自己的模板中调用自身的。不过它们只能通过 name 选项来做这件事：</p>
      <pre>
        ...
        name: 'Recursive',
        components: {
          Recursive: 'Recursive'
        }
        ...
      </pre>
      <Recursive :RecursiveData="16" />
    </Cell>

    <Cell>
      <el-divider content-position="left">组件之间的循环引用</el-divider>
      <p class="guess">如果两个组件循环引用, 可以在 循环引用的那个组件当中 使用 webpack 的异步 import</p>
      <TreeFolder :folder="folder" />
    </Cell>

    <Cell>
      <el-divider content-position="left">inline-template</el-divider>
      <my-component inline-template>
        <div>
          <p>{{testInline}}</p>
          <p>These are compiled as the component's own template.</p>
          <p>Not parent's transclusion content.</p>
        </div>
      </my-component>
    </Cell>

    <Cell>
      <el-divider content-position="left">控制更新</el-divider>
      <p class="guess">vm.$forceUpdate() 迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。</p>

      <div v-once>
        <p>v-once 创建低开销的静态组件 {{onceData}} <button @click="onceData += 1">onceData update</button></p>
        <p class="guess">在元素上使用 v-once 指令之后, data 就不会被更新</p>
      </div>
    </Cell>

  </div>
</template>
<script>
  import InjectChild from './InjectChild'
  import CodeItems from '@/components/CodeItems'
  import Event from './Event'
  import Recursive from './Recursive'

  import TreeFolder from './TreeFolder'

  export default {
    components: {
      InjectChild,
      CodeItems,
      Event,
      Recursive,
      TreeFolder,
      'my-component': {
        data() {
          return {
            testInline: 'inline-template'            
          }
        }
      }
    },
    provide: {
      provideData: {
        a: 1,
        b: 2,
        c: 3
      }
    },
    data() {
      return {
        eventListener: [{
          code: '$on(eventName, eventHandler)',
          des: '侦听一个事件'
        }, {
          code: '$once(eventName, eventHandler)',
          des: ' 一次性侦听一个事件'
        }, {
          code: '$off(eventName, eventHandler)',
          des: '停止侦听一个事件'
        }],
        folder: {
          name: 'folderName',
          children: [{
            name: 'folder1',
            children: [{
              name: 'folder11'
            }],
          }, {
            name: 'folder2',
            children: [{
              name: 'folder22',
            }]
          }]
        },
        onceData: 0
      }
    },
    created() {
      this.$on('testEvent', this.testEventHandle)
    },
    mounted() {
      console.log(this.$root)
      console.log(this.$parent)

      const handle = () => {
        console.log('addEventListener')
      }

      let element = document.querySelector('#addEventListener')

      element.addEventListener('click', handle)

      this.$once('hook:beforeDestroy', () => {
        console.log('removeEventListener')
        element.removeEventListener('click', handle)
      })
    },
    methods: {
      testEventHandle() {
        console.log('emit test event')
      },
      offTestEvent() {
        this.$off('testEvent')
      }
    }
  }
</script>