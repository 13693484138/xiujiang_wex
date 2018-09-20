// pages/repair/fault-choose/repair-content/confirm-order/choose-address/choose-address.js
const http = require('../../../../../../utils/http');
const AppConfig = require("../../../../../../utils/config");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      preOrderNo:'',
      addressList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.preOrderNo+'++++++++');
    this.setData({
      preOrderNo: options.preOrderNo
    })
    http.request({
      apiName:'reqair/getaddresslist',
      method:'get',
      success:(res) => {
        this.setData({
          addressList: res
        })
      }
    })
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
  goToAddAddress: function() {
    wx.navigateTo({
      url: '/pages/repair/fault-choose/repair-content/confirm-order/choose-address/add-address/add-address'
    })
  },
  enterAddressInfo:function(e){
    var addressId = e.currentTarget.dataset.addressid;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; 
    prevPage.setData({
      addressId: addressId
    })
    wx.navigateBack
      ({
      url: '/pages/repair/fault-choose/repair-content/confirm-order/confirm-order'
    })
  }
})