const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const PRODUCTION = false;
const OUTPATH = PRODUCTION ? '../server/public' : '../server/public';
module.exports = {
  entry: {
    'auctioneer' : path.resolve(__dirname, './src', 'scripts', 'auctioneer.js'),
    'bidder' : path.resolve(__dirname, './src', 'scripts', 'bidder.js')
  },
  mode : PRODUCTION ? 'production' : 'development',
  target: "node",
  externals: {
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
  },
  output: {
    path: path.resolve(__dirname, OUTPATH),
    //filename: 'scripts/bundle.js'
    filename: 'scripts/[name]-bundle.js'
  },

  devServer: {
    static: {
       publicPath: path.resolve(__dirname, 'dist'),
       watch : true
    },
    host: 'localhost',
    port : 8080,
    open : true
} ,
module: {
    rules : [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif)/i,
      }
    ]
  },
  plugins: [  
    new HtmlWebpackPlugin({
	template: "./src/auctioneer.html",
	filename: "./auctioneer.html",
	chunks : ['auctioneer']
    }),
    new HtmlWebpackPlugin({
	template: "./src/bidder.html",
	filename: "./bidder.html",
	chunks : ['bidder']
    }),
    new CopyPlugin({
        patterns: [
	    {
		from: 'src/*.html',
		to:   '[name][ext]',
		noErrorOnMissing: true,
		globOptions:{
		    ignore:['**/auctioneer*.html','**/bidder*.html']
		}
	    },
	    {
		from: 'src/images/*',
		to:   'images/[name][ext]',
		noErrorOnMissing: true
	    },
	    {
		from: 'src/style/*',
		to:   'style/[name][ext]',
		noErrorOnMissing: true
	    },
        ]
    })
],
};
