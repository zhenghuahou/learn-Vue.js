/**
* @Author: geyuanjun
* @Date:   2016-07-19 17:43:9
* @Email:  geyuanjun.sh@superjia.com
* @Last modified by:   geyuanjun
* @Last modified time: 2016-07-20 11:30:7
*/



module.exports = {
  entry: './main.js',
  output: {
    path: __dirname,
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-loader/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  devtool: '#source-map'
}
