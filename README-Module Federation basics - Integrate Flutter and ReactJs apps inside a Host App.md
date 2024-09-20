# Introduction

This page will guide you to integrate a Flutter App inside a React Js. 

Make sure you have read the below two docs as pre-requisites. These links are also referenced in the guide below.

| Create a Flutter build and run it using webpack | [https://hariomsinha.notion.site/Run-Flutter-web-app-build-using-webpack-126ab15ac7e848939ab09f3f2ef53bef?pvs=4](https://www.notion.so/Run-Flutter-web-app-build-using-webpack-126ab15ac7e848939ab09f3f2ef53bef?pvs=21) |
| --- | --- |
| Setup a React JS host app and run another React Js module inside it. | [https://hariomsinha.notion.site/Module-Federation-basics-Host-React-app-inside-a-React-App-861daecc8dc74aaeb9166cf1bd7eba54?pvs=4](https://www.notion.so/Module-Federation-basics-Host-React-app-inside-a-React-App-861daecc8dc74aaeb9166cf1bd7eba54?pvs=21) |

# Steps

### Setup the First Module - Flutter App

1. Create the Flutter build first.

```jsx
flutter build web --web-renderer html
```

1. Once the build is completed, you will get build folder like below:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/7b6e8688-1898-4a40-acf0-25e592b34cd7/10538f19-1c0d-4c77-b9d8-760b53dca3c3/image.png)

1. Now, lets expose the flutter app using webpack.

<aside>
💡

*In the Flutter build folder, or a project containing flutter build, setup webpack. For more details, check this doc:* [https://hariomsinha.notion.site/Run-Flutter-web-app-build-using-webpack-126ab15ac7e848939ab09f3f2ef53bef?pvs=4](https://www.notion.so/Run-Flutter-web-app-build-using-webpack-126ab15ac7e848939ab09f3f2ef53bef?pvs=21)

[Run Flutter web app build using webpack](https://www.notion.so/Run-Flutter-web-app-build-using-webpack-126ab15ac7e848939ab09f3f2ef53bef?pvs=21)

</aside>

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/7b6e8688-1898-4a40-acf0-25e592b34cd7/449c5047-a997-4456-9a88-b6dab8a83758/image.png)

1. Expose the flutterbuild using webpack module federation.

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

```

<aside>
💡 Here, we are exposing our main.dart.js file that has all the build contents. The entry point is remoteEntry.js and the route to access flutter is ‘/App’

</aside>

1. Run the Flutter app

```jsx
npx webpack serve --config webpack.config.js --port 3012
```

### Setup the Second Module - React App

<aside>
💡 For more details on how to setup the React App, check this doc: [https://hariomsinha.notion.site/Module-Federation-basics-Host-React-app-inside-a-React-App-861daecc8dc74aaeb9166cf1bd7eba54?pvs=4](https://www.notion.so/Module-Federation-basics-Host-React-app-inside-a-React-App-861daecc8dc74aaeb9166cf1bd7eba54?pvs=21)

[Module Federation basics - Host React app inside a React App](https://www.notion.so/Module-Federation-basics-Host-React-app-inside-a-React-App-861daecc8dc74aaeb9166cf1bd7eba54?pvs=21)

</aside>

1. Setup webpack for the react app and expose the App.js using Module Federation

```jsx
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3011,
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
      name: "childreact",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.js",
      },
      shared: {react: { singleton: true }, "react-dom": { singleton: true }},
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

```

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/7b6e8688-1898-4a40-acf0-25e592b34cd7/41fd90a4-5b96-4f51-a169-712d4bf5a461/image.png)

### Setup the Host Module

<aside>
💡 *For more details on how to setup the host app, please check this doc:* [https://hariomsinha.notion.site/Module-Federation-basics-Host-React-app-inside-a-React-App-861daecc8dc74aaeb9166cf1bd7eba54?pvs=4](https://www.notion.so/Module-Federation-basics-Host-React-app-inside-a-React-App-861daecc8dc74aaeb9166cf1bd7eba54?pvs=21)

</aside>

1. Now, create a Host app, that can host a ReactJs app and a Flutter app together.

```jsx
 // install below deps
 
 npm i react react-dom
 npm i -D @babel/core @babel/preset-react babel-loader html-webpack-plugin webpack
 npm i -D webpack-cli webpack-dev-server
```

```jsx
//setup webpack config like below

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const {ModuleFederationPlugin} = require('webpack').container;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3010,
    proxy: [
      {
        context: ["/assets/"],
        target: "http://localhost:3012",
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
        childreact: "childreact@http://localhost:3011/remoteEntry.js", // access the react App
        flutterapp: "flutterapp@http://localhost:3012/remoteEntry.js", // access the flutter App
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

```

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/7b6e8688-1898-4a40-acf0-25e592b34cd7/43b838be-5254-4490-adb6-b707764ce023/image.png)

<aside>
💡 Here, we are accessing the React and Flutter App using the remotes exposed by Flutter and React JS Apps.

```jsx
  remotes: {
        childreact: "childreact@http://localhost:3011/remoteEntry.js", // access the react App
        flutterapp: "flutterapp@http://localhost:3012/remoteEntry.js", // access the flutter App
      },
```

</aside>

<aside>
💡 Since, the flutter’s entry point: main.dart.js is using some assets to run the Flutter App, we need to redirect the assets access to the flutter’s host.

```jsx
proxy: [
      {
        context: ["/assets/"],
        target: "http://localhost:3012",
      },
    ],
```

</aside>

### Run all the 3 Apps now, and we can access both the React and Flutter Apps inside the Host App.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/7b6e8688-1898-4a40-acf0-25e592b34cd7/945e6320-c44e-4ed1-9656-b0aa13173443/image.png)

# Notes

1. proxy multiple assets issues
2.