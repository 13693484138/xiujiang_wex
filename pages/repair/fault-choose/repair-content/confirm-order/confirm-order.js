// pages/repair/fault-choose/repair-content/confirm-order/confirm-order.js
var util = require('../../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTop: true,
    showModal: false,
    radioData: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(util.dateLater(util.getCurrentToday, 7));
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
  goToAddAddress: function () {
    wx.navigateTo({
      url: '/pages/repair/fault-choose/repair-content/confirm-order/choose-address/choose-address'
    })
  },
  alertTips: function () {
    this.setData({
      showModal: true
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  preventTouchMove: function () {
  },
  radioChange: function(event) {
    this.setData({
      radioData: event.detail.value
    })
  },
  goToRecommendShop: function() {
    wx.navigateTo({
      url: '/pages/repair/fault-choose/repair-content/confirm-order/recommend-shop/recommend-shop'
    })
  },
  
})