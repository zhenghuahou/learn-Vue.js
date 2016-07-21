/**
* @Author: geyuanjun
* @Date:   2016-07-20 23:07:10
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-21 15:54:9
*/
export const INCREASE = ({ dispatch }) => dispatch('INCREASE', 1)
export const DECREASE = ({ dispatch }) => dispatch('DECREASE', 1)
export const UPDATE = ({ dispatch }, value) => dispatch('UPDATE', value)
