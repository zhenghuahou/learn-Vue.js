/**
* @Author: geyuanjun
* @Date:   2016-07-20 10:23:57
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-20 10:26:13
*/

export const cartProducts = state => {
  return state.cart.added.map(({ id, quantity }) => {
    const product = state.products.add.find(p => p.id === id)
    return {
      title: product.title,
      price: product.price,
      quantity
    }
  })
}
