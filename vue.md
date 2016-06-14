<!--
@Author: geyuanjun
@Date:   2016-06-13 16:23:58
@Email:  geyuanjun.sh@superjia.com
@Last modified by:   geyuanjun
@Last modified time: 2016-06-14 15:30:23
-->



# Vue.js 漫谈

### 一、简单的Vue程序
```html
<div id="app">{{message}}</div>
```
```javascript
new Vue({
    el:'#app',
    data:{
        message:'Hello World'
    }
})
```
##### 1、Vue 使用第一步
创建Vue实例
```javascript
new Vue({
   el:'#app'
});
```

##### 2、Vue 使用第二步
创建数据
```javascript
new Vue({
   el:'#app',
   data:{
       message:'Hello World'
   }
});
```

##### 3、Vue使用第三步
通过方法methods在不同的生命周期里面操作数据
```html
<div id="app">{{message}}</div>
<button v-on:click="consoleMessage">Console Message</button>
```

```javascript
new Vue({
   el:'#app',
   data:{
       message:'Hello World'
   },
   methods:{
       consoleMessage: function () {
          console.log(this.message);
       }
   }
});
```

### 二、Vue中几个常用的API
1. 指令
    - `v-if`：所操作元素在DOM中会销毁或者重建
        ```html
        <h1 v-if="ok">Yes</h1>
        ```
    - `v-show`：相当于修改DOM元素的`display`属性，元素会始终保持在DOM结构中
        ```html
        <h1 v-show="ok">Yes</h1>
        ```
    - `v-bind`:绑定属性或者prop传值需要做值的解析
        ```html
        <div class="static" v-bind:class="{ 'class-a': isA, 'class-b': isB }"></div>
        ```
        ```javascript
        data: {
          isA: true,
          isB: false
        }
        ```
    - `v-on`：绑定方法或者事件
    - `v-for`:循环一个数组，根据数组中的元素来修改DOM
        ```html
        <ul id="example-1">
          <li v-for="item in items">
            {{ item.message }}
          </li>
        </ul>
        ```
        ```javascript
        var example1 = new Vue({
          el: '#example-1',
          data: {
            items: [
              { message: 'Foo' },
              { message: 'Bar' }
            ]
          }
        })
        ```
2. 生命周期
    - `ready`:常在这个时期用来获取数据 
3. 事件
    - 基本原生事件都会支持，常用的包括`click`,`keyup`等等
4. `watch`
    - 监听`data`中的某个属性，一旦发生变化就可以做相应的操作
        ```javascript
        var vm = new Vue({
          data: {
            a: 1
          },
          watch: {
            'a': function (val, oldVal) {
              console.log('new: %s, old: %s', val, oldVal)
            },
            // 方法名
            'b': 'someMethod',
            // 深度 watcher
            'c': {
              handler: function (val, oldVal) { /* ... */ },
              deep: true
            }
          }
        })
        vm.a = 2 // -> new: 2, old: 1
        ```

### 三、组件的应用
>组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。

1. 注册
创建组件构造器
```javascript
var MyComponent = Vue.extend({
  // 选项...
})
```
用`Vue.component(tag, constructor)`注册：
```javascript
// 全局注册组件，tag 为 my-component
Vue.component('my-component', MyComponent)
```
这样注册之后，就可以在父实例中使用
    ```html
    <div id="example">
      <my-component></my-component>
    </div>
    ```

    ```javascript
    // 定义
    var MyComponent = Vue.extend({
      template: '<div>A custom component!</div>'
    })

    // 注册
    Vue.component('my-component', MyComponent)

    // 创建根实例
    new Vue({
      el: '#example'
    })
    ```
    渲染的结果就是：
    ```html
    <div id="example">
      <div>A custom component!</div>
    </div>
    ```

2. 传递数据

    子组件不能直接引用父组件的数据，需要通过props才能把数据传给子组件
    例如：有一个组件`<child>`
    在子组件内通过显式的调用`props`可以接受父组件的传值

    a. 静态props

    ```javascript
    Vue.component('child', {
      // 声明 props
      props: ['msg'],
      // prop 可以用在模板内
      // 可以用 `this.msg` 设置
      template: '<span>{{ msg }}</span>'
    })
    ```
    ```html
    <child msg="hello!"></child>
    ```

    b.动态props

    需要用到`v-bind`来绑定动态`props`到父组件的数据
    ```html
    <child v-bind:my-message="parentMsg"></child>
    ```

    c.双向绑定：`prop`默认是单向绑定，父->子,如果需要子->父，那么需要使用`.sync`强制双向绑定

3. slot

    `Vue`编译的时候，除了所传的数据，父组件的其他内容将抛弃。
    可以采用`slot`特性保存父组件的内容
    例如：
    假如`my-component`组件有下面模板：
    ```html
    <div>
      <h1>This is my component!</h1>
      <slot>
        如果没有分发内容则显示我。
      </slot>
    </div>
    ```
    父组件模板：
    ```html
    <my-component>
      <p>This is some original content</p>
      <p>This is some more original content</p>
    </my-component>
    ```

    渲染结果：
    ```html
    <div>
      <h1>This is my component!</h1>
      <p>This is some original content</p>
      <p>This is some more original content</p>
    </div>
    ```

### 四、Vue原理
>把一个普通对象传给 Vue 实例作为它的 data 选项，Vue.js 将遍历它的属性，用 Object.defineProperty 将它们转为 getter/setter

- 用户看不到getter/setter，但是在内部他们让Vue.js追踪依赖，在属性被访问和修改时通知变化

- 模板中每个指令/数据绑定都有一个对应的 watcher 对象，在计算过程中它把属性记录为依赖。之后当依赖的 setter 被调用时，会触发 watcher 重新计算 ，也就会导致它的关联指令更新 DOM

### 五、Vue+VueRresource+VueRouter+Vux
微信企业号目前使用的Vue技术选型是：`Vue`+`VueRresource`+`VueRouter`+`Vux`

简单的代码示例：微信企业号产品百科
- 路由
- `v-link`
- `v-if`
- `v-for`
- `$http`(promise)
