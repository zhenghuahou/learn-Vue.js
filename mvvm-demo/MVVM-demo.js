/**
 * @Author: geyuanjun
 * @Date:   2016-06-22 18:02:8
 * @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-15 10:34:45
 */

! function(f) {
    window.mvvm = f()
}(function() {
    // 寻找所需要的渲染的节点的标识
    var start = '{{'
    var end = '}}'

    function mvvm(sel, opt) {
        return new MVVM(sel, opt)
    }

    function MVVM(sel, opt) {
        this.root = document.querySelector(sel) // 找到其根节点
        var model = this.pureModel = opt.model || {} // 记录传入的model
        var model2sync = {} // 保存节点
        this.model = getProxyModel()

        var me = this // this -> MVVM
        for (var k in model) {
            model2sync[k] = []
        }

        // model -> view
        renderDOM(this.root, opt.model)

        // view -> model
        if (opt.type === 'form') {
            on(this.root, ['keyup', 'click'], function(e) {
                var name = e.target.name
                if (name) {
                    if (e.target.value != model[name]) {
                        me.model[name] = e.target.value
                    }
                }
            })
        }

        // 存好了node和原始值, 通过修改model.name = xxx就更新视图（es5）
        function getProxyModel() {
            var obj = {}
            each(Object.keys(model), function(i, k) {

                Object.defineProperty(obj, k, {
                    set: function(v) {
                        model[k] = v
                        var arr = model2sync[k]
                        each(arr, function() {
                            this.node.textContent = renderStr(this.raw)
                        })
                    },
                    get: function() {
                        return model[k]
                    }
                })
            })
            return obj
        }

        // render属性节点, 再render子节点, 如果子节点有dom节点, 则递归执行
        function renderDOM(dom) {
            each(dom.attributes, function() { // 逐步遍历id， class等等属性
                render(this)
            })
            each(dom.childNodes, function() {
                if (this.nodeType === 1) {
                    return renderDOM(this)
                }
                render(this)
            })
        }

        function renderStr(str) {
            var ret = ''
            var arr = str.split(start) // sure have length
            for (var i = 0; i < arr.length; i++) {
                var two = arr[i].split(end)
                if (two.length === 1) ret += arr[i]
                else ret += model[two[0]] + two[1]
            }
            return ret
        }

        // render函数的目标就是找到最小节点的textContent中含有{{ key }}这样的变量, 并替换key
        function render(node) {

            var arr = node.textContent.split(start)

            if (!arr.length) return
            var ret = ''
            for (var i = 0; i < arr.length; i++) {
                var two = arr[i].split(end)
                if (two.length === 1) ret += arr[i]
                else {
                    ret += model[two[0]] + two[1] // 如果找到{{key}},则利用model中的key相应的进行替换
                        // model 持续更新支持
                        // 如果节点中用到了某个model值, 我们就把这个节点存起来, 他的原始textContent也存起来, 这样以后就能根据变化的model找到这个节点并按照原始textContent更新
                    model2sync[two[0]].push({
                        node: node,
                        raw: node.textContent
                    })
                }
            }
            node.textContent = ret
        }
    }

    // view -> model
    function on(el, events, handler) {
        if (Array.isArray(events)) {
            each(events, function() {
                on(el, this, handler)
            })
        } else el.addEventListener(events, handler, true)
    }

    function each(arr, fn) {
        for (var i = 0; i < arr.length; i++) {
            fn.call(arr[i], i, arr[i])
        }
    }
    return mvvm

})


// demo

// var $ = document.querySelector.bind(document)
var demo1 = mvvm('#demo1', {
        model: {
            name: 'Monkey',
            time: Date(),
            css: 'green'
        }
    })
    // setInterval(function() {
    //     demo1.model.time = Date()
    // }, 1000)
var a = mvvm('#demo2', {
    type: 'form', // view -> model
    model: {
        name: '',
        password: ''
    }
})
