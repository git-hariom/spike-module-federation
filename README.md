# Introduction

This Project is a Spike for Module Federation, which involves integrating ReactJs to React Js, Flutter to React JS following the standards of MicroFrontends.

There are multiple Projects in this repo.
1. childreact - this is a React Js app
2. flutter-2, flutterbuild, hariom-flutter-app, test_web_integration are Flutter Projects
3. Host app is a React Js app where the above React and Flutter apps are integrated resp.

You can follow below Readme for more refs.
1. README-Module Federation basics - Host React app inside a React App.md
2. README-Module Federation basics - Integrate Flutter and ReactJs apps inside a Host App.md
3. README-Run Flutter web app build using webpack.md

For more details, you can reach out to me here: 
mail - hariom.sinha.dev@gmail.com

# Run the project

1. For React Projects, 
    ```
        npm install
        npm start
    ```
2. For Flutter Projects,
    ```
        npx webpack serve --config webpack.config.js --port 3013
    ```
    > since we are running Flutter independently using webpack.js

# Imp 
    1. Please check the running Port numbers of each project in package.json / webpack config to avoid confusion.

# Link And Refs

    https://hariomsinha.notion.site/Module-Federation-basics-Integrate-Flutter-and-ReactJs-apps-inside-a-Host-App-3da71826eac4463c9f59430a138dce53?pvs=4

    https://hariomsinha.notion.site/Module-Federation-basics-Host-React-app-inside-a-React-App-861daecc8dc74aaeb9166cf1bd7eba54?pvs=4

    https://hariomsinha.notion.site/Run-Flutter-web-app-build-using-webpack-126ab15ac7e848939ab09f3f2ef53bef?pvs=4

    https://hariomsinha.notion.site/Create-a-React-App-without-using-CRA-421825a0b87144b9a809d7d5f0680f3e?pvs=4



