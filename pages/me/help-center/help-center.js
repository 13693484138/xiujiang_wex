// pages/me/help-center/help-center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  gotoProblem: function () {
    wx.navigateTo({
      url: '/pages/me/help-center/common-problem/common-problem'
    })
  },
  gotoAfterSale: function () {
    this.setData({
      showModal:true
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  gotoLocation: function () {
    wx.navigateTo({
      url: '/pages/me/help-center/location/location'
    })
  },
  gotoflow: function () {
    wx.navigateTo({
      url: '/pages/me/help-center/service-flow/service-flow'
    })
  },
  gotoTerms: function () {
    wx.navigateTo({
      url: '/pages/me/help-center/service-terms/service-terms'
    })
  },
})