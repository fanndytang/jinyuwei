'use strict';

import Base from './base.js';

export default class extends Base {
    //  添加
    async addAction() {
        let info = 'success';
        if(this.http.method != 'OPTIONS') {
            let model = this.model('productlist');
            let data = {
                title: this.http._post.title,
                summary: this.http._post.summary,
                cover: this.http._post.cover, //  字符串
                thumbs: this.http._post.thumbs.split(','),  //  数组
                category: this.http._post.category.split(','),  //  数组
                content: this.http._post.content,
                price: parseFloat(this.http._post.price),
                discount: parseFloat(this.http._post.discount)  //  折扣
            };
            if(data.title === '') {
                info = '请填写标题';
            }else if(data.cover === '') {
                info = '请上传封面图';
            }else if(data.thumbs.length === 0) {
                info = '请上传缩略图';
            }else if(data.category.length === 0) {
                info = '请上传分类图';
            } else if(data.price === '' || data.price === 0) {
                info = '请输入价格';
            }
            if(!!data.price && !/\d/ig.test(data.price)) {
                info = '金额格式不正确';
            }
            if(!!data.discount && (!/\d/.test(data.discount) || data.discount > 100 || data.discount < 0)) {
                info = '抵扣格式不正确';
            }
            if(info === 'success') {
                await model.add(data);
            }
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.http.header('Content-Type','text/html; charset=utf-8');
        this.http.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
        this.http.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
        this.success({info: info, status: true});
    }

    //  显示
    async listAction() {
        let result = [];
        if(this.http.method != 'OPTIONS') {
            let model = this.model('productlist');
            let image = this.model('Images');
          //  result = await model.select();
            result = await model.page(this.get('page'), 10).countSelect();
            for (let key in result.data) {
                result.data[key].cover = await image.where({_id: result.data[key].cover}).find();
            }
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.success(result);
    }

    //  删除
    async deleteAction() {
        if(this.http.method != 'OPTIONS') {
            let model = this.model('productlist');
            await model.where({_id: this.http._post.id}).delete();
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.http.header('Content-Type','text/html; charset=utf-8');
        this.http.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
        this.http.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
        this.success({info: '删除成功'});
    }


    //  查看
    async detailAction() {
         let result = {};
        if(this.http.method != 'OPTIONS') {
            let model = this.model('productlist');
            console.log(this.http._get.id);
            result = await model.where({_id: this.http._get.id}).find();
        }
        this.http.header('Access-Control-Allow-Origin','*');
        this.http.header('Access-Control-Allow-Credentials',true);
        this.success(result);
    }
}