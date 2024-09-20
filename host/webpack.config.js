const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const {ModuleFederationPlugin} = require('webpack').container;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    historyApiFallback: true,
    port: 3010,
    proxy: [
      {
        context: ["/assets/"],
        target: "http://localhost:3013",
      },
    ],
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        childreact: "childreact@http://localhost:3011/remoteEntry.js",
        // flutterapp: "flutterapp@http://localhost:3012/remoteEntry.js",
        // flutterapp2: "flutterapp2@http://localhost:3013/remoteEntry.js",
        castielflutter: "castielflutter@http://localhost:3013/remoteEntry.js",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};


/*



*/
