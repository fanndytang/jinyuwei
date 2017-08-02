let path = require('path');
let cooking = require('cooking');
process.noDeprecation = true;

cooking.set({
    entry: {
        app: ['babel-polyfill', './src/main.js']
    },
    dist: './dist',
    template: [
        {
            template: './index.tpl',
            filename: 'index_index.html'
        }
    ],
    devServer: {
        port: 8070,
        publicPath: '/',
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1:8360',
                changeOrigin: true
            }
        }
    },
    // production
    clean: true,
    hash: true,
    sourceMap: true,
    minimize: true,
    chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
    postcss: [
        // require('...')
    ],
    publicPath: '/static/web/dist/',
    assetsPath: 'static',
    urlLoaderLimit: 10000,
    static: true,
    extractCSS: '[name].[contenthash:7].css',
    alias: {
        'src': path.join(__dirname, 'src')
    },
    extends: ['vue2', 'less', 'autoprefixer']
});

module.exports = cooking.resolve();
