// pages/order/repair/repair.js
const http = require('../../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderNo = options.orderNo;
    var orderStatus = options.status;
    console.log(options)
    getOrderDetail(this, orderNo, orderStatus);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  goToOrderList: function() {
    wx.navigateBack({
    })
  }
})

function getOrderDetail(me, orderno, state) {
  console.log(orderno+'-----'+state)
  http.request({
    apiName: 'order/orderdetail',
    method: 'POST',
    data: { orderno: orderno, status: state },
    success: function (res) {
      me.setData({
        order: res
      })
      console.log(me.data.order);
    }
  })
}