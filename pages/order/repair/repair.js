// pages/order/repair/repair.js
const http = require('../../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: 0,
    order: {},
    showModal: false,
    reasonIndex:0,
    reasonList: [],
    disable: false,
    otherReason:'',
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  hideModal: function() {
    this.setData({
      showModal: false
    });
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
  cancelOrder: function(e) {
    var tempReason = this.data.reasonList[this.data.reasonIndex].reason;
    console.log(tempReason)
    if(tempReason =='其他原因'){
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