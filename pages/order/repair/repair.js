// pages/order/repair/repair.js
const http = require('../../../utils/http');
const util = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: 0,
    order: {},
    showModal: false,
    showComment: false,
    reasonIndex:0,
    reasonList: [],
    disable: false,
    otherReason:'',
    type:'',
    commentReason: [],
    commentReasonIndex:0,
    commentDisable: false,
    otherCommentReason:''
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.log("repair--onLoad")
    var orderNo = options.orderNo;
    var tempType = options.type;
    console.log(options)
    this.setData({
      type: tempType
    })
    getOrderDetail(this, orderNo);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("repair--onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("repair--onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("repair--onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("repair--onUnload")
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
  goToOrderList: function() {
    if(this.data.type == 1){
      console.log("type1.....")
      //从订单列表进这个页面
       wx.navigateBack({})
    }else if(this.data.type == 2){
      wx.switchTab({
        url: '/pages/order/home-page/home-page',
      }) 
    }
  },
  alertTips: function() {
    http.request({
      apiName: 'order/reasonlist',
      method: 'get',
      success: (res) => {
        this.setData({
          reasonList: res,
          showModal: true
        })
        console.log(this.data.reasonList);
      }
    })
  },
  alertSH: function () {
    http.request({
      apiName:'my/getreason',
      method:'get',
      success: res => {
        console.log(res)
        this.setData({
          showComment: true,
          commentReason: res
        })
      }
    })
    
  },
  toPay: function() {
    console.log(this.data.order.orderno)
    http.request({
      apiName:'pay/getPrePayOrder',
      method:'post',
      isShowProgress:true,
      progressTitle:'支付中',
      data:{
        orderno:this.data.order.orderno
      },
      success: res => {
        wx.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: res.signType,
          paySign: res.paySign,
          success:function(){
            wx.redirectTo({
              url: '/pages/order/repair/repair?orderNo=' + id + '&type=2'
            })
          }
        })
      }
    })
  },
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  hideComment: function () {
    this.setData({
      showComment: false
    });
  },
  changeCommentClass: function (event) {
    var tempCommentIndex = event.currentTarget.dataset.commentindex;
    var tempcommentReason = this.data.commentReason[tempCommentIndex];
    if (tempcommentReason.reason == '其它原因'){
      this.setData({
        commentDisable: true,
        commentReasonIndex: tempcommentReason.id
      })
    }else{
      this.setData({
        commentDisable: false,
        commentReasonIndex: tempcommentReason.id
      })
    }
  },
  getReason:function(e){
    var tempOtherReason = e.detail.value;
    console.log(tempOtherReason);
    if (tempOtherReason){
      this.setData({
        otherReason: tempOtherReason
      })
    }
  },
  getCommentReason:function(e){
    var tempOtherCommentReason = e.detail.value;
    if (tempOtherCommentReason){
      this.setData({
        otherCommentReason: tempOtherCommentReason
      })
    }
  },
  goToComment: function () {
    wx.navigateTo({
      url: '/pages/order/comment/comment?id=' + this.data.order.orderno
    })
  },
  changeDuiClass: function(event) {
    var tempReasonIndex = event.currentTarget.dataset.json;
    if (this.data.reasonList[tempReasonIndex].reason == '其他原因'){
      this.setData({
        disable:true
      })
    }else{
      this.setData({
        disable:false
      })
    }
    this.setData({
      reasonIndex: tempReasonIndex
    })
    
  },
  //取消订单
  cancelOrder: function(e) {
    var tempReason = this.data.reasonList[this.data.reasonIndex].reason;
    if(tempReason =='其他原因' || tempReason == '其它原因'){
      tempReason = tempReason +' :' +this.data.otherReason;
    }
    var orderNo = this.data.order.orderno;
    http.request({
      apiName:'order/cancelorder',
      method:'put',
      data:{
        orderno:orderNo,
        reason:tempReason
      },
      isShowProgress:true,
      success:(res) => {
        this.setData({
          showModal: false
        })
        wx.showToast({
          title: "订单取消成功",
          mask:true,
          duration:1000,
        })
        wx.reLaunch({
          url: '/pages/order/home-page/home-page',
        })
      }
    })
  },
  //呼叫技师
  callEngineer:function(e){
    console.log(this.data.order)
    http.request({
      apiName:'my/getworkerphone/'+this.data.order.workerid,
      method:'get',
      success: res => {
        console.log(res);
        wx.makePhoneCall({
          phoneNumber: res
        })
      }
    })
    
  },
  //导航到店
  driving:function(e){
    var _this = this;
    http.request({
      apiName: 'reqair/getShopById/' + _this.data.order.shopid,
      method:'get',
      isShowProgress: true,
      success: res => {
        console.log(res)
        let lon = res.lon;
        let lat = res.lat;
        wx.getLocation({
          success: res => {
            wx.openLocation({
              latitude: lat,
              longitude: lon,
              scale: 28
            })
          },
        })
      }
    })
  },
  //订单售后
  afterorder:function(e){
    var _that = this;
    if (_that.data.commentReasonIndex == 0){
      util.showRemind("请选择售后理由")
     }else{
      var tempReason = _that.data.commentReason[_that.data.commentReasonIndex].reason;
      if (tempReason == '其它原因' || tempReason == '其他原因'){
        tempReason = tempReason + _that.data.otherCommentReason
      }
      http.request({
        apiName:'order/afterorder',
        method:'put',
        isShowProgress: true,
        progressTitle: "申请中...",
        data:{
          orderno: _that.data.order.orderno,
          reason: tempReason
        },
        success: res => {
          wx.showToast({
            title: '申请成功',
            icon: 'success',
            duration: 1000,
            success: res => {
              wx.switchTab({
                url: '/pages/order/home-page/home-page',
              })
            }
          })
          
        }
      })
     }
  }
})

function getOrderDetail(me, orderno) {
  http.request({
    apiName: 'order/orderdetail',
    method: 'POST',
    data: {
      orderno: orderno
    },
    success: function(res) {
      console.log(res)
      me.setData({
        orderStatus: res.status,
        order: res
      })
      let tempParts = res.parts;
      let tempOrderarts = '';
      switch (tempParts) {
        case 1:
          tempOrderarts = '待诊断';
          break;

      }
      me.setData({
        orderParts: ''
      })
    }
  })
}