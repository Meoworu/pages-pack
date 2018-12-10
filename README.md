# 前端构建工具 PAPK

前端自动化脚手架工具，可以打包vue，react项目的单页面及多页面应用。

# 应用
改脚手架工具只能应用在vue 和 react项目上

# 安装

```
npm install -g papk-cli

yarn global add papk-cli
```
或者在一个文件夹中进行如下操作进行安装

```
git init 

git clone https://github.com/Meoworu/pages-pack.git

cd pages-pack 

npm install 或者 yarn

```
当pages-pack文件夹中出现node-modules文件夹后说明依赖安装成功，然后执行如下命令

```
npm link 
```
注：如果npm link失败当话，可能是因为你没有使用管理员权限，此时mac系统用户执行如下命令

```
sudo npm link
```
windows用户则以管理员身份启动命令行执行

```
npm link 
```
验证是否安装成功,在命令行下输入

```
pack -v

// 1.1.0
```
说明cli已经链接到全局了

# 使用
1. 新建一个项目文件夹作为你的vue或者react项目目录然后命令行进入该目录下执行命令

```
pack //你将会看到所有可执行命令和功能
```
2. 新建一个项目

```
pack init 
```
3. 添加页面应用

```
pack cteate
```
4. 启动调试项目

```
pack server
```
5. 构建项目

```
pack build
```
注意：命令都需在项目根目录下执行