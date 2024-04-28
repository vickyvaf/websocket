const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "production",
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "build"),
    publicPath: "/",
    filename: "index.js",
  },
  target: "node",
  externals: [nodeExternals()],
};
