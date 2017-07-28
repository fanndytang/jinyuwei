
export default {
    compare (property) {   //  比较两个数值大于（可用于排序）
        return function (a, b) {
            let value1 = a[property]
            let value2 = b[property]
            return value1 - value2
        }
    },
    arrayIn (arr, ele, callback) {  //  查询数组内是否有某个元素
        let flag = false;
        for(let key in arr) {
            if(arr[key] === ele) {
                flag = true;
                if(typeof callback === 'function') {
                    callback(key);
                }
                break;
            }
        }
        return flag;
    },
    readBlobAsDataURL(blob, callback) {  //  二进制转base64
        let a = new FileReader();
        a.onload = function(e) {
            //callback( e.target.result);
            let img = document.createElement('img');
            img.setAttribute('src', e.target.result);
            img.onload = function () {
                let wAh = {
                    w:img.width,
                    h:img.height
                };
                if(img.width > 1200){
                    wAh.w *= 0.5;
                    wAh.h *= 0.5;
                }
                wAh.w = wAh.w.toFixed(0);
                wAh.h = wAh.h.toFixed(0);
                let cvs = document.createElement('canvas');
                cvs.width = wAh.w;
                cvs.height = wAh.h;
                cvs.getContext("2d").drawImage(img, 0, 0, wAh.w, wAh.h);
                let base64Data = cvs.toDataURL('image/jpeg',0.8);
                callback(base64Data);
                img = null;
                cvs = null;
            };
        };
        a.readAsDataURL(blob);
    },
    setUpload(data) {
        let obj = {
            fid: !!data ? data.fid : '',
            src: !!data ? data.src : '',
            loading: false,
            failed: false,
            success: !!data ? !!data.src : false
        };
        obj.beforeUpload = (file) => {
            obj.loading = true;
            obj.success = false;
            this.readBlobAsDataURL(file, function(base64) {
                obj.src = base64;
            });
        };
        obj.changeUpload = (file, fileList) => {
            obj.loading = false;
        };
        obj.failedUpload = (err, file, fileList) => {
            obj.failed = true;
        };
        obj.successUpload = (res, file) => {
            if(res.data.status) {
                obj.fid = res.data.data.file._id;
            }
            obj.failed = !res.status;
            obj.success = !!res.status;
            obj.loading = false;
        };
        return obj;
    }
};
