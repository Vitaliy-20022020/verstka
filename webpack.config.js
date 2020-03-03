const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require ("optimize-css-assets-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./dist"),
  assets: "assets/"
}

module.exports = {
 entry: {
   uikit: `${PATHS.src}/uikit.js`,
   webpages: `${PATHS.src}/webpages.js`,
   },
 output: {
  filename: `${PATHS.assets}js/[name].js`,
  path: PATHS.dist},

    
module: {
  rules: [{
    test: /\.js$/,
    include: path.resolve(__dirname, "src/js"),
    use: {
      loader: "babel-loader",
      options: {
        presets: "env"
      }
    }
  },
  {
    test: /\.(sass|scss)$/,
     use: [
       "style-loader",
        MiniCssExtractPlugin.loader,
        {loader: "css-loader",
        },
        {loader: "postcss-loader",
        options: {config: {path: "src/postcss.config.js"}}
        },
        {loader: "sass-loader",
        } 
     ]
  },
 // {
 //   test: /\.css$/,
  //   use: [
  //        MiniCssExtractPlugin.loader,
  //        "css-loader",
  //               ]
//},
{
  test: /\.html$/,
  use: ['raw-loader']
},
{
  test: /\.(jpg|svg|png|gif)$/,
  use: [{
    loader: "file-loader",
    options: {
      name: "[name].[ext]",}
  //    outputPath: "./",
   //   useRelativePath: true}
  },
{
  loader: "image-webpack-loader",
  options: {
    mozjpeg: {
      progressive: true,
      quality: 70}
  }
}]
},
{
  test: /\.(woff|woff2|ttf|eot|svg)?$/,
     loader: "url-loader?limit=30000&[name].[ext]",
    
  },
{
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
     use: [{
    loader: "file-loader",
    options: {
      filename: "[name].[ext]"
    }
    }]
  },
  

]
},


plugins: [
  new MiniCssExtractPlugin({
    filename: `${PATHS.assets}css/[name].css`,
  }),
  new HtmlWebpackPlugin({
    title: "UI-kit",
    filename: `${PATHS.assets}html/uikit.html`,
    template: `${PATHS.src}/uikit/uikit.html`,
    hash: true,
  }),
  new HtmlWebpackPlugin({
    title: "Webpages",
    filename: `${PATHS.assets}html/webpages.html`,
    template: `${PATHS.src}/webpages/webpages.html`,
    hash: true,
    }),
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: "dist/*.*"
  }),
  new webpack.ProvidePlugin({
    $: "jquery",
    "jQuery": "jquery",
    "window.jQuery": "jquery"
  }),
  new OptimizeCssAssetsPlugin({
assetNameRegExp: /\.css$/g,
cssProcessor: require("cssnano"),
cssProcessorPluginOptions: {
  preset: ["default", {discardComments: {removeAll: true}}]
},
canPrint: true
}),
  new CopyWebpackPlugin([{
 from: `${PATHS.src}/img`,
 to: `${PATHS.assets}img`
  },
  {
  from: `${PATHS.src}/uikit/fonts`,
   to: `${PATHS.assets}fonts`
  }
]),


]


}

