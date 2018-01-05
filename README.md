# simple-react-app

`npm start` to start dev server with hot reload, it's live on `localhost:3000`.


`npm run build` to build prod bundle, it includes both treeshaking and uglify to optimize the code as much as possible.


## Project structure

```
*root*
|
├── */src/*
│   ├── *actions/* where images and stuff are stored
│   ├── *api/* react-router jsx pages
│   ├── *asserts/* images, etc.
│   ├── *constants/* Application wide constants, mainly used for redux actions
│   ├── *pages/* components for the diffeten pages
│   ├── *App.jsx* main layout, deals with routes
│   ├── *index.html* entry point
│   ├── *index.jsx* javascript entry point
│   ├── *store.js* redux store
|   └── *style.scss* styling
├── *package.json* the whole package.json with every dependency and script, nothing is kept hidden
├── *.eslintrc* eslint config
├── *.babelrc* babel config (polyfills)
├── *webpack.config.js* webpack config, it has a dev and prod environment
└── *README.md* this file
```


## Eslint

This project uses AirBnB Javascript specs so you can write error-free react and javasctipt code, if you use Visual Studio Code, you can install eslint from the extension tab to activate this function, other editors just google _name of the editor + eslint_ you will find how to enable it for your editor.


