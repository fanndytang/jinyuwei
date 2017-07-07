'use strict';

import Base from './base.js';

export default class extends Base {
    //  添加
    async addAction() {
        if(this.http.method != 'OPTIONS') {
            let model = this.model('Order');
            await model.add({
                title: this.http._post.title,
                content: this.http._post.content
            });
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.http.header('Content-Type','text/html; charset=utf-8');
        this.http.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
        this.http.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
        this.success({info: 'success', status: true});
    }

    //  显示
    async listAction() {
        let result = [];
        if(this.http.method != 'OPTIONS') {
            let model = this.model('Order');
            result = await model.select();
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.success(result);
    }

    //  删除
    async deleteAction() {
        if(this.http.method != 'OPTIONS') {
            let model = this.model('Order');
            await model.where({id: this.http._post.id}).delete();
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.http.header('Content-Type','text/html; charset=utf-8');
        this.http.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
        this.http.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
        this.success(1);
    }


    //  查看
    async detailAction() {
        let result = {};
        if(this.http.method != 'OPTIONS') {
            let model = this.model('Order');
            console.log(this.http._get.id);
            result = await model.where({_id: this.http._get.id}).find();
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.success(result);
    }


    //  更新
    async updateAction() {
        if(this.http.method != 'OPTIONS') {
            let model = this.model('Order');
            await model.where({
                _id: this.http._post.id
            }).update({
                group: this.http._post.group,
                content: this.http._post.content,
                imagesid: this.http._post.imagesid,
                link: this.http._post.link,
                target: this.http._post.target,
                sort: this.http._post.sort
            });
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.http.header('Content-Type','text/html; charset=utf-8');
        this.http.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
        this.http.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
        this.success({info: 'success', status: true});
    }
}