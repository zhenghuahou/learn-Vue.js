var path  = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  //入口
  entry:'./src/main',
  //输出
  output:{
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },

  module:{
    //加载器
    loaders:[
      {test:/\.vue$/,loader:'vue'},
      {test:/\.js$/,loader:'babel',exclude:/node_modules/},
      {test:/\.css$/,loader:'!style!css!autoprefixer'},
      {test:/\.less$/,loader:'!style!css!autoprefixer!less'},
      {test:/\/sass$/,loader:'!style!css!autoprefixer!sasa'},
      {test:/\.(png|jpg|gif)$/,loader:'url-loader'},
      {test:/\.(html|tpl)$/,loader:'html-loader'}
    ]
  },

  vue:{
    loaders:{
      css:'style!css!autoprefixer!less'
    }
  },

  babel:{
    presets:['es2015'],
    plugins:['transform-runtime']
  },

  plugins: [
    new WebpackNotifierPlugin(),
  ],

  resolve:{
    //require的时候省略的扩展名，如：require('module')不需要module.js
    extensions:['','.js','.vue'],
    //别名
    alias:{
      filter:path.join(__dirname, './src/filters'),
      components:path.join(__dirname, './src/components')
    }
  },

  //开启source-map，webpack有多种source-map，在官网可以查到
  devtool:'#source-map'
};
