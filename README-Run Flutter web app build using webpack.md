# Introduction

This page will guide you to host a Flutter web build using webpack.

# Steps

1. Create a Flutter web build

```jsx
flutter build web --web-renderer html
```

1. Setup a different project folder such that you keep the build files in a specific folder.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/7b6e8688-1898-4a40-acf0-25e592b34cd7/a7b43132-7dd5-4a40-9ecc-25dbbd62d13c/image.png)

1. Install required dependencies

```jsx
 npm i -D @babel/core babel-loader html-webpack-plugin webpack
 npm i -D webpack-cli webpack-dev-server
```

1. Setup webpack config.

<aside>
💡 All the path should be according to the folder structure above.

</aside>

```jsx
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
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./build/index.html",
    }),
  ],
};

```

1. Setup script path correctly in index.html.

```jsx
  <script src="./main.dart.js" type="application/javascript"></script>
```

1. Serve the project.

```jsx
 npx webpack serve --config webpack.config.js --port 3012
```

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/7b6e8688-1898-4a40-acf0-25e592b34cd7/317b7f42-4b9f-4ec0-8f85-a916d3c0a887/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/7b6e8688-1898-4a40-acf0-25e592b34cd7/3c729c27-01ad-42bf-b166-24723a072c0d/image.png)

# Notes

1. we can use `python server` as well.