#!/usr/bin/env node


const program = require('commander');
const chalk = require('chalk');
const json = require('../package.json');
const util = require('../src/util.js');
const init =  require('./init.js');
const create = require('./create.js');
const build = require('./build.js');
const server = require('./server.js');

program
    .version(json.version, '-v, --version')
    .description('papk web开发命令行工具')

program
    .command('init')
    .description('初始化项目')
    .action(function (option) {
        if(util.getFiles(util.USER_DIR).length!=0){
            console.log(chalk.yellow('\n请在一个空目录下进行项目初始化'));
            return ;
        }else{
            init();
        }
    })

program
    .command('create')
    .description('创建应用')
    .action(function (option) {
        if(util.checkProject()){
            return ;
        }
        create();
    })

program
    .command('build')
    .description('打包项目')
    .action(function (option) {
        if(util.checkProject()){
            return ;
        }
        build();
    })

program
    .command('server')
    .description('运行项目')
    .action(function (option) {
        if(util.checkProject()){
            return ;
        }
        server();
    })

program
	.command('*')
	.action(function(env){
		help();
    });
    
program.parse(process.argv);

// 当用户不输入任何参数时
if (!program.args.length){
	help();
}

function help(){
    console.log(`     #           #              #           
    ##########      #######    ##########    ##########
        #    #     #     #         #    #         #
        #    #    # #   #          #    #         #
       #     #       ###          #     #        #
      #   # #       ##           #   # #        #
     #     #      ##            #     #       ##`)
    program.help();
}