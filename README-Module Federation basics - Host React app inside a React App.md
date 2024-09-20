# Introduction

This page will guide us host a React Js app inside another ReactJs app, as MicroFrontends.

# Steps

1. Setup React Apps.
    1. Create package.json
    
    ```jsx
    npm init
    ```
    
    1. Install basic deps
    
    ```jsx
     npm i react react-dom
     npm i -D @babel/core @babel/preset-react babel-loader html-webpack-plugin webpack
     npm i -D webpack-cli webpack-dev-server
    
    ```
    
    1. Create public and src folders.
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/7b6e8688-1898-4a40-acf0-25e592b34cd7/8c1e8acf-3ba8-4e5e-8ab8-ac1f5be7eca3/image.png)
    
    1. Add root element in index.html.
    
    ```jsx
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Host App</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
    </html>
    ```
    
    1. Add a basic JSX in App.js
    
    ```jsx
    import React from "react";
    
    const App = () => {
        return (
            <div>Parent App</div>
        )
    }
    
    export default App;
    ```
    
    1. Link the App.js to the element root in index.js.
    
    ```jsx
    import React from "react";
    import App from "./App";
    import { createRoot } from "react-dom/client";
    
    const root = createRoot(document.getElementById('root'));
    
    root.render(<App />);
    ```
    
    1. Create webpack.config.js file.
    2. Add basic config for webpack.
    
    ```jsx
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const path = require('path');
    
    module.exports = {
      entry: "./src/index",
      mode: "development",
      devServer: {
        static: path.join(__dirname, "dist"),
        port: 3010,
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
        new HtmlWebpackPlugin({
          template: "./public/index.html",
        }),
      ],
    };
    
    ```
    
2. Now, update the child webpack to expose the App.js

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

1. Now, update the webpack.js file to target the exposed remotes

```jsx
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const {ModuleFederationPlugin} = require('webpack').container;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3010,
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
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const {ModuleFederationPlugin} = require('webpack').container;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3010,
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
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

```

1. Now, create a bootstrap.js file and move the index.js contents inside it. Do this in both host and remotes.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/7b6e8688-1898-4a40-acf0-25e592b34cd7/a01ee5a4-3251-49cd-94a5-9ff467bd9846/image.png)

1. Now, import the bootstrap.js file in index.js file. Do this in both host and remotes.

```jsx
import ('./bootstrap');
```

1. Now, inside the host, import the remote using lazy loading.

```jsx
import React, { Suspense } from "react";
const ChildReact = React.lazy(()=> import('childreact/App'));

const App = () => {
    return (
        <div>
            Parent App has
            <Suspense fallback="loading">
                <ChildReact />
            </Suspense>
        </div>
    )
}

export default App;
```

1. Now, first serve the remotes and then the host. The Host will be able to access the remotes now.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/7b6e8688-1898-4a40-acf0-25e592b34cd7/27f4e38e-05f4-466d-a5b4-e2a61d5b7f29/image.png)

# Child Apps with Route Setup

There are high chances that the child apps will have routing setup done. In this case, while accessing the childApp over a route in the host app will throw error.

To solve this, make sure the `route at which the host is trying to access the child, should be the same route which is a basename for the child apps`.

```jsx
//child app routing with basename
  <Router basename="/react">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </Router>
  );
```

```jsx
//host accessing the child app on the same basename route
    <Router>
      <Routes>
        {/* <Route path="/flutter" exact element={<FlutterApp />} /> */}
        <Route path="/react" element={<ReactApp />} />
      </Routes>
    </Router>
```

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/7b6e8688-1898-4a40-acf0-25e592b34cd7/d627b63d-e7c0-4564-b401-3a4bec5aff29/image.png)