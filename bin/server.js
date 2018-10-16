const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
const express = require('express');
const util = require('../src/util.js');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../src/config.js');

module.exports = function(){
    console.log(chalk.green('监听localhost:8080'));
    const app = express();
    const compiler = webpack(webpackConfig('pages', true));
    app.use(webpackMiddleware(compiler,{
        lazy:false,
        stats:{
            colors:true,
        },
        publicPath:''
    }));
    app.listen(8080);
}