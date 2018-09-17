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
    getList(this, 1)
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
    var state = event.currentTarget.dataset.state;
    if(state == 1) {
      wx.navigateTo({
        url: '/pages/order/submitted/submitted?id='+id+'&state='+state
      })
    }else if(state == 2) {
      wx.navigateTo({
        url: '/pages/order/accept/accept?id='+id+'&state='+state
      })
    }else if(state == 3) {
      wx.navigateTo({
        url: '/pages/order/repair/repair?id=' + id + '&state=' + state
      })
    }else if(state == 4) {
      wx.navigateTo({
        url: '/pages/order/payment/payment?id=' + id + '&state=' + state
      })
    }else if(state == 5 || state == 6) {
      wx.navigateTo({
        url: '/pages/order/finish/finish?id=' + id + '&state=' + state
      })
    }
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