// pages/order/home-page/home-page.js
const http = require('../../../utils/http');
const AppConfig = require("../../../utils/config");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    textColor: false,
    nextPage: 0,
    totalPage: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("list--onLoad");
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("list--onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("list--onShow");
    getList(this, 1)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("list--onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("list--onUnload");
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom");
    if(this.data.nextPage <= this.data.totalPage) {
      getList(this, this.data.nextPage)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  goToOrderDetail: function(event) {
    var id = event.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/order/repair/repair?orderNo=' + id +'&type=1'
      })
  }
})


function getList(me, nextPage) {
  http.request({
    apiName: 'order/orderlist',
    method: 'POST',
    data: { currentPage: nextPage },
    success: function (res) {
      console.log(res);
      let orders = me.data.orders;
      orders = orders.concat(res.list);
      me.setData({
        orders: orders,
        nextPage: res.currentPage + 1,
        totalPage: res.total
      })
    }
  })
}