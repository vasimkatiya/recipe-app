// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point of your application
  entry: './src/index.js',

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // cleans dist folder before each build
  },

  // Mode
  mode: 'development', // change to 'production' for production build

  // Module rules
  module: {
    rules: [
      // Babel loader for JS/JSX
      {
        test: /\.jsx?$/, // matches .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },

      // CSS loader
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // css-loader reads CSS, style-loader injects into DOM
      },

      // Optional: Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // source HTML
      filename: 'index.html', // output HTML
    }),
  ],

  // Dev Server configuration
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // folder to serve
    },
    compress: true,
    port: 3000,
    open: true, // automatically open in browser
    hot: true, // enable hot module replacement
  },

  // Resolve extensions
  resolve: {
    extensions: ['.js', '.jsx'], // allows import without extensions
  },
};
