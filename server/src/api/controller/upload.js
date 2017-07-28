'use strict';

import Base from './base.js';
import fs from 'fs';
import path from 'path';
export default class extends Base {
    /**
     * 创建文件夹
     * */
    mkdir (dirpath,dirname) {
        //判断是否是第一次调用
        if(typeof dirname === "undefined"){
            if(fs.existsSync(dirpath)){
                return;
            }else{
                this.mkdir(dirpath,path.dirname(dirpath));
            }
        }else{
            //判断第二个参数是否正常，避免调用时传入错误参数
            if(dirname !== path.dirname(dirpath)){
                this.mkdir(dirpath);
                return;
            }
            if(fs.existsSync(dirname)){
                fs.mkdirSync(dirpath)
            }else{
                this.mkdir(dirname,path.dirname(dirname));
                fs.mkdirSync(dirpath);
            }
        }
    }

    /**
     * 添加
     * */
    async imageAction() {
        let newfile = '';
        if(this.isPost()) {
            const file = this.file();
            const newFileName = path.basename(file.file.path);
            let date = new Date();
            const filepath = date.getFullYear() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getDate() + '/';
            this.mkdir(think.ROOT_PATH+'/www/static/upload/'+filepath);
            fs.renameSync(file.file.path, path.join(think.ROOT_PATH + '/www/static/upload/' + filepath + newFileName));
            let model = this.model('Images');
            await model.add({
                path: 'http://127.0.0.1:8360/static/upload/' + filepath + newFileName,
                file: think.ROOT_PATH + '/www/static/upload/' + filepath + newFileName
            });
            newfile = await model.where({file: think.ROOT_PATH + '/www/static/upload/' + filepath + newFileName}).find();
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.http.header('Content-Type','text/html; charset=utf-8');
        this.http.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
        this.http.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
        this.success({data: {file: newfile}, info: 'success', status: true});
    }

    /**
     * 获取
     * */
    async getimgsAction() {
        let result = [];
        if(this.isGet()) {
            let model = this.model('Images');
            let fids = this.http._get.fids.split(',');
            for(let key in fids) {
                result[key] =  await model.where({_id: fids[key]}).find();
            }
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.success(result);
    }
}