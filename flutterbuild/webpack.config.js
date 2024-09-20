const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./build/main.dart.js",
  devServer: {
    static: {
      directory: path.join(__dirname, "build/"),
    },
    compress: true,
    port: 3012,
    historyApiFallback: true,
    client: {
      overlay: {
        warnings: false,
        errors: false,
      }
    }
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "auto",
  },
  mode: "development",
  plugins: [
    new ModuleFederationPlugin({
      name: "flutterapp",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./build/main.dart.js",
      },
      shared: {},
    }),
    new HtmlWebpackPlugin({
      template: "./build/index.html",
    }),
  ],
};