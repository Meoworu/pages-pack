const path = require('path');
const fs = require('fs');
const util = require('./util.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const { VueLoaderPlugin } = require('vue-loader');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
function htmlPlugins (src, names){
    let arr = [];
    names.forEach((name)=>{
        arr.push(new HtmlWebpackPlugin({
            filename:`${name}.html`,
            template:`${src}/${name}/${name}.html`,
            inject: true,
            chunks:[name]
        }))
    })
    return arr;
}

module.exports = (src, falg)=>{
    src = path.join(util.USER_DIR, src);
    let appNames = fs.readdirSync(src), appEntry = {};
    appNames.forEach((name)=>{
        appEntry[name] = `${src}/${name}/${name}.js`;
    });
    let configObj = {
        entry: appEntry,
        output:{
            filename:`js/[name]_[hash:8].js`,
            path:path.resolve(util.USER_DIR, 'dist'),
        },
        module:{
            rules:[
                {
                    test:/\.vue$/,
                    use:['vue-loader'],
                },
                {
                    test:/\.ts$/,
                    exclude:[
                        path.resolve(util.USER_DIR, 'node_modules'),
                    ],
                    use:['ts-loader'],
                },
                {
                    test:/(\.js|\.jsx)$/,
                    exclude:[
                        path.resolve(util.USER_DIR, 'node_modules'),
                    ],
                    use:['babel-loader'],                    
                },
                {
                    test:/(\.scss)$/,
                    use:ExtractTextPlugin.extract({
                        fallback:'style-loader',
                        use:[
                            'css-loader?minimize',
                            'sass-loader',
                        ],
                    })
                },
                {
                    test:/(\.less)$/,
                    use:ExtractTextPlugin.extract({
                        fallback:'style-loader',
                        use:[
                            'css-loader?minimize',
                            'less-loader'
                        ]
                    })
                },
                {
                    test:/(\.css)$/,
                    use:ExtractTextPlugin.extract({
                        fallback:'style-loader',
                        use:[
                            'css-loader?minimize',
                        ]
                    })
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      fallback:'file-loader',
                      name: 'image/[name].[hash:7].[ext]',
                    }
                  },
                  {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      name: 'media/[name].[hash:7].[ext]'
                    }
                  },
                  {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      name: 'fonts/[name].[hash:7].[ext]'
                    }
                  }
            ]
        },
        watchOptions:{
            // 不去监听node_modules里的文件
            ignored: /node_modules/
        },
        resolve: {
            modules: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(util.USER_DIR, 'node_modules'),
            ],
            alias: {
                'vue': 'vue/dist/vue.js'
            }
        },
        plugins:[
            new VueLoaderPlugin(),
            ...htmlPlugins(src, appNames),
            new AutoDllPlugin({//导出公共包使用缓存减少构建时间
                entry:{
                    vendor:[
                        'react',
                        'react-dom',
                        'vue',
                        'axios',
                        'vuex'
                    ]
                },
                inject:true,
                filename:`[name].js`,
                path:'js',
            }),
            new ExtractTextPlugin({
                filename:`[name]_[contenthash:8].css`,
            }),
            new ProgressPlugin(),
        ],
        devtool:falg ? 'source-map' : undefined
    }
    !falg && configObj.plugins.push(new UglifyJsPlugin());
    return configObj;
}