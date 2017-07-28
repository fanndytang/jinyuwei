<template>
  <div>
    <div class="show">
      <el-carousel height="350px" class="imgs">
        <el-carousel-item v-for="item in list.thumbs" :key="item">
          <img :src="item.path || ''" :alt="item.alt || ''" class="image" />
        </el-carousel-item>
      </el-carousel>
      <div class="summary">
        <h1 class="title">{{list.title || ''}}</h1>
        <p class="small">{{list.summary || ''}}</p>
        <div class="price">
          <div class="underline">原价：<span class="num">{{!!list.price ? '￥'+list.price : '' }}</span></div>
          <div>{{!!list.price ? '￥'+list.price*list.discount/100 : ''}}</div>
        </div>
        <el-form label-width="50px" ref="form" :model="ruleForm" >
          <el-form-item label="分类" class="category">
            <ul>
              <li v-for="item in list.category"><img :src="item.path" :alt="item.alt || ''"></li>
            </ul>
          </el-form-item>
          <el-form-item label="数量">
            <el-input-number v-model="ruleForm.num"></el-input-number>
          </el-form-item>
          <el-form-item>
          <!--  <el-button type="primary">加入清单</el-button>-->
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="describle">
      <div class="title">商品详情</div>
      <div class="content" v-html="list.content"></div>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                ruleForm: {},
                list: {}
            }
        },
        mounted () {
            this.getDetail();
        },
        methods: {
            getDetail () {
                let that = this;
                let id = that.$route.params.id;
                that.$http.get('/api/product/detail?id=' + id).then(res => {
                    let result = res.data.data;
                  //  console.log(result)
                    if(result.thumbs) {
                        that.getImgs(result.thumbs, function(data) {
                            that.list.thumbs = data.data.data;
                        });
                    }
                    if(result.cover) {
                        that.getImgs(result.cover, function(data) {
                            that.list.cover = data.data.data;
                        });
                    }
                    if(result.category) {
                        that.getImgs(result.category, function(data) {
                            that.list.category = data.data.data;
                        });
                    }
                    that.list = result;
                });
            },
            getImgs(ids, callback) {
                console.log(ids)
                if(typeof ids !== 'string') {
                    ids = ids.join(',');
                }
                this.$http.get('/api/upload/getimgs?fids=' + ids).then((res) => {
                    callback(res);
                }).catch(() => {});
            }
        }
    }
</script>
<style rel="stylesheet/less" lang="less">
  .describle .content img {
    max-width: 100%;
  }

</style>
<style rel="stylesheet/less" lang="less" scoped>
  .show {
    display: flex;
    .imgs {
      width: 400px;
      height: 350px;
      overflow: hidden;
      .image {
        width: 100%;
      }
    }
    .summary {
      flex: 1;
      padding-left: 30px;
      .title {
        font-size: 18px;
        color: #333;
        line-height: 24px;
      }
      .small {
        font-size: 12px;
        line-height: 20px;
        color: #666;
      }
      .price {
        background: #f9e5bf;
        padding: 15px;
        line-height: 30px;
        font-size: 30px;
        color: #ef203b;
        .underline {
          margin-bottom: 20px;
          .num {
            text-decoration: line-through;
          }
          font-size: 16px;
          color: #999;
        }
      }
    }
    .category {
      margin: 20px 0;
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          display: inline-block;
          margin: 0 5px;
          border: 1px solid #eee;
          width: 50px;
          height: 50px;
          overflow: hidden;
          line-height: 50px;
          text-align: center;
          img {
            max-height: 100%;
            max-width: 100%;
          }
        }
      }
    }
  }

  .describle {
    margin-top: 30px;
    .title {
      padding: 0 15px;
      line-height: 40px;
      color: #666;
      font-size: 16px;
      border-bottom: 1px solid #eee;
    }
    .content {
      color: #333;
      line-height: 24px;
      img {
        max-width: 100%;
      }
    }
  }
</style>

