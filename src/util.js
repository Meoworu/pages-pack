const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
class Util {
    constructor(){
        this.USER_DIR =  process.cwd();// 执行路径
        this.appName = 'index';//应用名称
        this.type = ''//项目类型
        this.url = '';//模版路径
        this.name = '';//项目名称
        this.version = '';//项目初始版本
        this.author = '';//项目作者
    }
    // 获取一个路径的所有文件
    getFiles(url){
        return fs.readdirSync(url);
    }
    // 初始化项目
    init(answers){
        let url = answers.type == 'vue' ? path.join(__dirname, './templates/vue') : path.join(__dirname,'./templates/react');
        this.url = url;
        this.name = answers.name;
        this.version = answers.version;
        this.author = answers.author;
        this.copyFolder(url, this.USER_DIR);
        console.log(chalk.green('项目初始化成功'))
    }
    // 创建应用
    create(name){
        let type = this.appJson().type;
        let src = type == 'vue' ? path.join(__dirname, './templates/vue/pages') : path.join(__dirname,'./templates/react/pages');
        let tar = path.join(this.USER_DIR, 'pages');
        this.copyFolder(src, tar, name);
        console.log(chalk.green('创建应用成功'));
    }
    // 拷贝文件
    copyFile (srcPath, tarPath, name='index') {
        let rs = fs.createReadStream(srcPath);
        let ws = fs.createWriteStream(tarPath);
        rs.setEncoding('utf8');
        rs.on('data', (chunk)=>{
            let str = chunk.replace(/\${name}/g, name).replace(/\${appName}/g, this.name).replace(/\${version}/g, this.version).replace(/\${author}/g, this.author);          
            ws.write(str);
        })
    }
    //拷贝文件夹
    copyFolder(srcDir, tarDir, appName) {
        fs.readdir(srcDir, (err, files)=> {
            files.forEach((file)=> {
                let srcPath = path.join(srcDir, file);
                let tarPath = "";
                fs.stat(srcPath, (err, stats)=> {
                    if (stats.isDirectory()) {
                        tarPath = path.join(tarDir, appName||file);
                        fs.mkdir(tarPath, (err)=> {
                            if (err) {
                                console.log(err)
                                return
                            }
                            this.copyFolder(srcPath, tarPath, appName);
                        })
                    } else {
                        tarPath = (file.indexOf('app') != -1) ? path.join(tarDir, file) : path.join(tarDir, appName ? appName+file.slice(file.indexOf('.')) : file );
                        this.copyFile(srcPath, tarPath, appName);
                    }
                })
            })
        })
    }
    appJson(){
        let json = require(path.join(this.USER_DIR, 'package.json'));
        return json;
    }
    // 校验是否事项目的根目录
    checkProject(){
        let files = this.getFiles(this.USER_DIR);
        let str = files.join('');
        if(str.indexOf('package.json')==-1){
            console.log(chalk.yellow('警告：发现环境目录下缺失“package.json”文件或者当前目录不是根目录'));
            return true;
        }
        if(str.indexOf('pages')==-1){
            console.log(chalk.yellow('警告：发现环境目录下缺失“pages”文件或者当前目录不是根目录'));
            return true;
        }
        if(str.indexOf('static')==-1){
            console.log(chalk.yellow('警告：发现环境目录下缺失“static”文件或者当前目录不是根目录'));
            return true;
        }
        if(str.indexOf('.babelrc')==-1){
            console.log(chalk.yellow('警告：发现环境目录下缺失“.babelrc”文件或者当前目录不是根目录'));
            return true;
        }
        if(require(path.join(this.USER_DIR, 'package.json')).key!=='papk'){
            console.log(chalk.yellow('警告：该项目可能不是papk创建的项目，不能用papk进行处理'));
            return true;
        }
    }

}
module.exports = new Util();
