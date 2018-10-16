const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const util = require('../src/util.js');
module.exports = function(){
    inquirer.prompt([
        
        {
            type: 'input',
            message:'请输入应用名称 name?',
            name: 'name',
            validate: function(name){
                if(name==''){
                    console.log(chalk.yellow('\n应用名称不能为空'));
                    return false;
                }
                let flag = true;
                let files = fs.readdirSync(path.join(util.USER_DIR, 'pages'));
                for(let i=0; i<files.length; i++){
                    if(files[i] == name){
                        flag = false;
                        console.log(chalk.yellow('\n不能输入重复的应用名称'));
                        break ;
                    }
                }
                return flag;
            }
        }
        
    ]).then((answers)=>{
        util.create(answers.name);
    }).catch((error)=>{
        console.log(error);
    })
}