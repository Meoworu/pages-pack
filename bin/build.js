const webpack = require('webpack');
const chalk = require('chalk');
const webpackConfig = require('../src/config.js');
const path = require('path');
const util = require('../src/util');
module.exports = function(){
    console.log(chalk.green('代码输出路径'));
    console.log(chalk.green(path.join(util.USER_DIR, 'dist')));
    webpack(webpackConfig('pages'), (err, stats)=>{
        if(err ){
            console.log(chalk.red('错误：项目构建出错'))
        }else{
            console.log(chalk.green('项目构建成功'));
        }
    });
}