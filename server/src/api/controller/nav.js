'use strict';

import Base from './base.js';

export default class extends Base {

    //  添加
    async addAction() {
        let result = {};
        if(this.http.method != 'OPTIONS') {
            let model = this.model('navlist');
            let sort = await model.where({
                sort: this.http._post.sort,
                type: parseInt(this.http._post.type)
            }).find();
            let max = 0;
            if(!!sort._id) {
                let maxArr = await model.where({'type': this.http._post.type}).select();
                for(let key in maxArr) {
                    max = Math.max(max, maxArr[key].sort);
                }
                await model.where({_id: sort._id}).update({sort: parseInt(max)+1});
            }else {
                max = this.http._post.sort;
            }
            await model.add({
                title: this.http._post.title,
                link: this.http._post.link,
                target: this.http._post.target,
                sort: this.http._post.sort,
                type: this.http._post.type
            });
            result = await model.where({
                sort: this.http._post.sort,
                type: this.http._post.type
            }).find();
            result.max = max;
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.http.header('Content-Type','text/html; charset=utf-8');
        this.http.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
        this.http.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
        this.success({data: result, info: 'success', status: true});
    }

    //  删除
    async deleteAction() {
        if(this.http.method != 'OPTIONS') {
            let model = this.model('navlist');
            await model.where({_id: this.http._post.id}).delete();
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.http.header('Content-Type','text/html; charset=utf-8');
        this.http.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
        this.http.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
        this.success({info: '删除成功'});
    }

    //  获取
    async listAction() {
        let result = [];
        if(this.http.method != 'OPTIONS') {
            let model = this.model('navlist');
            let type = parseInt(this.http._get.type);
            result = await model.where({type: type}).select();
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.success(result);
    }

    //  更新
    async updateAction() {
        if(this.http.method != 'OPTIONS') {
            let model = this.model('navlist');
            await model.where({
                _id: this.http._post.id
            }).update({
                title: this.http._post.title,
                link: this.http._post.link,
                target: this.http._post.target,
                sort: this.http._post.sort,
                type: this.http._post.type
            });
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.http.header('Content-Type','text/html; charset=utf-8');
        this.http.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
        this.http.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
        this.success({info: 'success', status: true});
    }

    // 查询某一条导航信息
    async onenavAction() {
        let result = [];
        if(this.http.method != 'OPTIONS') {
            let model = this.model('navlist');
            result = await model.where({
                sort: this.http._get.sort,
                type: this.http._get.type
            }).find();
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.success(result);
    }
}