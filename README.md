<h1 align="center"> Collectable Quest</h1>

# About Project

* Help the Dwarf king to rebuild his homeland all made up of NFT. <br />
* The game is built using phaser and solidity deployed on Okex blockchain with help of truffle.

# Demo Video
* https://youtu.be/0bneh4zV1cA

<h1>Glimpse of the Game</h1>

<img src="https://i.ibb.co/MhLWZbt/hobbitsofpolygon-1.png" width="500" height="490" />
<img src="https://i.imgur.com/nwcDOgy.png" width="950" height="490" />
<img src ='https://i.imgur.com/lTV8E2S.png' width="950" height='490' />
<img src="https://i.imgur.com/vHTbh4C.png" width="950" height="490" />
<img src = "https://i.ibb.co/WKCCNYZ/screenshot22.png" width = "950" height = "500" />
<img src = "https://i.ibb.co/tKX5fWC/Screenshot-29.png" width = "950" height = "490" />
<img src = "https://i.ibb.co/NVYDm0J/Screenshot-26.png" width = "950" height = "490" />


# Phaser 3 Webpack Project Template

A Phaser 3 project template with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/) that includes hot-reloading for development and production-ready builds.

This has been updated for Phaser 3.50.0 version and above.

Loading images via JavaScript module `import` is also supported, although not recommended.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm dev` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |
## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

## Customizing the Template

### Babel

You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you want your project to support. The targeted browsers are set in the `.babelrc` file and the default currently targets all browsers with total usage over "0.25%" but excludes IE11 and Opera Mini.

 ```
"browsers": [
  ">0.25%",
  "not ie 11",
  "not op_mini all"
]
 ```

### Webpack

If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), you should be able to open `http://mycoolserver.com/index.html` and play your game.
