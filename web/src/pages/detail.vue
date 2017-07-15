<template>
  <div>
    <div class="show">
      <el-carousel height="350px" class="imgs">
        <el-carousel-item v-for="item in list.thumbs" :key="item">
          <img :src="item.picture" :alt="item.alt || ''" class="image" />
        </el-carousel-item>
      </el-carousel>
      <div class="summary">
        <h1 class="title">{{list.title}}</h1>
        <p class="small">{{list.summary}}</p>
        <div class="price">
          <div class="underline">原价：<span class="num">￥{{list.price}}</span></div>
          <div>￥{{list.real_price}}</div>
        </div>
        <el-form label-width="50px" ref="form" :model="ruleForm" >
          <el-form-item label="分类" class="category">
            <ul>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
              <li><img src="" alt=""></li>
            </ul>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="ruleForm.num"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">加入清单</el-button>
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
                list: {
                    title: '测试店铺测试店铺测试店铺测试店铺测试店铺测试店铺测试店铺测试店铺测试店铺测试店铺',
                    summary: '简介简介简介简介简介简介简介简介简介简介简介简介',
                    price: 100,
                    real_price: 50,
                    content: '',
                    thumbs: [
                        {
                            picture: require('src/assets/images/hamburger.png'),
                            alt: 'test'
                        },
                        {
                            picture: require('src/assets/images/hamburger.png'),
                            alt: 'test'
                        },
                        {
                            picture: require('src/assets/images/hamburger.png'),
                            alt: 'test'
                        }
                    ]
                }
            }
        },
        mounted () {
            this.getDetail();
        },
        methods: {
            getDetail () {
                let self = this
                let id = self.$route.query.id
                this.$http.get('/api/product/detail?id=' + id).then(data => {
                  //  self.list = JSON.parse(data.request.response).data
                });
            }
        }
    }
</script>

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
          img {
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

