const inquirer = require('inquirer');
const chalk = require('chalk');
const util = require('../src/util.js');
module.exports = function(){
    inquirer.prompt([
        {
            type: 'list',
            message:'请选择要初始化的项目类型 type?',
            name: 'type',
            choices: ['vue', 'react'],
            default: 'vue'
        },
        {
            type: 'input',
            message:'请输入项目名称 name?',
            name: 'name',
            default: 'hello-world'
        },
        {
            type: 'input',
            message:'请输入版本号 version?',
            name: 'version',
            default: '1.0.0'
        },
        {
            type: 'input',
            message:'请输入作者名称 author?',
            name: 'author',
            default: '前端小白'
        }
    ]).then((answers)=>{
        util.init(answers);
        console.log(chalk.cyan('执行 ”npm install” 或 “yarn”'));
    }).catch((error)=>{
        console.log(error);
    })
}