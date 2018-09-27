// 引入SDK核心类
var QQMapWX = require('../../../../utils/qqmap-wx-jssdk.min.js');
// 引入HTTP请求
let http = require('../../../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: '' //地区选择器

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //地区选择器赋值
  bindRegionChange(e) {
    let region = e.detail.value;
    this.setData({
      region: region
    })
  },

  //获取用户位置
  getLocation() {
    // 实例化API核心类
    let demo = new QQMapWX({
      key: 'NQHBZ-KFYRI-HRJGZ-5EUUW-YE4KF-VSBW4' // 必填
    });
    let latitude; //纬度
    let longitude; //精度	
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        // console.log(res)
        latitude = res.latitude;
        longitude = res.longitude;
        //调用腾讯地址将经纬度转地址
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: (res) => {
            // console.log(res.result.address_component);
            if(res){
              let province = res.result.address_component.province;
              let city = res.result.address_component.city;
              let district = res.result.address_component.district;
              this.setData({
                region: [province, city, district]
              })
            }
          },
          fail: (res) => {
            wx.showToast({
              title: '定位失败',
            })
          },

        });
      }
    })

  },


  //表单验证规则
  validationRules(json) {
    let err = '';
    if (json.name == '') {
      err = '收货人不能为空';
      this.errToast(err)
      return false;
    }
    if (json.phone.length < 1) {
      err = '手机号不能为空';
      this.errToast(err);
      return false;
    }
    if (json.phone.length !== 11) {
      err = '手机号长度错误';
      this.errToast(err);
      return false;
    }
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!reg.test(json.phone)) {
      err = '手机号不符合要求';
      this.errToast(err);
      return false;
    }
    if (json.province == undefined) {
      err = '省市区不能空';
      this.errToast(err)
      return false;
    }
    if (json.address === '') {
      let err = '详细地址不能为空';
      this.errToast(err)
      return false;
    }
    return true;
  },
  //表单错误提示
  errToast(err) {
    wx.showToast({
      image: '../../../../images/icon/err.png',
      title: err,
    })
  },


  //保存表单
  saveData(e) {
    /*组装后台所需要的json */
    let json = e.detail.value;
    json.province = this.data.region[0];
    json.city = this.data.region[1];
    json.district = this.data.region[2];
    console.log(json)
    /*进行表单验证*/
    // if (!this.validationRules(json)) {
    //   console.log("表单验证无法通过")
    //   return false;
    // }
    /*通过表单验证人机交互*/
    wx.showModal({
      title: '提交',
      content: '请确定你的信息无误',
      success:(res)=>{
        //点击确定后
        if(res.confirm){
          console.log("开始提交表单")
        }
      }
    })
  },


  //提交表单方法
  submit(json){
    http.request({
      
    })
  }
})