/**
* @Author: geyuanjun
* @Date:   2016-07-20 09:59:24
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-20 10:11:54
*/

const _products = [
  {"id": 1, "title": "iPad", "price": 500, "inventory": 2},
  {"id": 2, "title": "H&M", "price": 10.99, "inventory": 10},
  {"id": 3, "title": "CD", "price": 19.99, "inventory": 5}
]

export default {
  getProducts (cb) {
    setTimeout(() => cb(_products), 100)
  },

  buyProducts (products, cb, errorCb) {
    setTimeout(() => {
      // 随机判断 checkout 是否成功
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJs') > -1)
        ? cb()
        : errorCb()
    }, 100)
  }
}
