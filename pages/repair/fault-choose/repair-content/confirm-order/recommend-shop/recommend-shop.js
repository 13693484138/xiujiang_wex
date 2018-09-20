// pages/repair/fault-choose/repair-content/confirm-order/recommend-shop/recommend-shop.js
const http = require('../../../../../../utils/http');
const AppConfig = require("../../../../../../utils/config");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressId:0,
    shopList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      addressId:options.addressId
    })
    console.log('选择网点页面addressID'+this.data.addressId);
    http.request({
      apiName:'reqair/getShopList/'+this.data.addressId,
      method:'get',
      success: (res) => {
        console.log(res);
        this.setData({
          shopList:res
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
  enterRecommendation: function (e) {
    var shopId = e.currentTarget.dataset.shopid;
    console.log(shopId);
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; 
    prevPage.setData({
      recommendationNetworkId:shopId
    })
    wx.navigateBack({
      url: '/pages/repair/fault-choose/repair-content/confirm-order/confirm-order'
    })
  }
})