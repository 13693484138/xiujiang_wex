// pages/me/become-distributor/distribution-center/me-downline/me-downline.js
const http = require('../../../../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindClass: true,
    lists: [],
    classA: 1,
    classB: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    http.request({
      apiName: 'my/subordinatelist',
      method: 'POST',
      data:{
        currentPage: that.data.classA
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
    if(this.data.bindClass) {
      // this.setData({
      //   lists: [
      //     { name: '小明', date: '02-27 12:13', member: 3 },
      //     { name: '小红', date: '03-27 13:13', member: 4 },
      //     { name: '小强', date: '04-27 14:13', member: 5 },
      //     { name: '小刚', date: '05-27 15:13', member: 6 },
      //     { name: '小王', date: '06-27 16:13', member: 6 }
      //   ]
      // })
    }
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
  changeClass: function(event) {
    var id = event.currentTarget.dataset.id;
    
    if (id == 1 && !this.data.bindClass) {
      this.setData({
        bindClass: !this.data.bindClass,
        // lists: [
        //   { name: '小明', date: '02-27 12:13', member: 3 },
        //   { name: '小红', date: '03-27 13:13', member: 4 },
        //   { name: '小强', date: '04-27 14:13', member: 5 },
        //   { name: '小刚', date: '05-27 15:13', member: 6 },
        //   { name: '小王', date: '06-27 16:13', member: 6 }
        // ]
      })
      return;
    }
    if (id == 2 && this.data.bindClass) {
      this.setData({
        bindClass: !this.data.bindClass,
        // lists: [
        //   { name: '大明', date: '07-27 17:13', member: 7 },
        //   { name: '大红', date: '08-27 18:13', member: 8 },
        //   { name: '大强', date: '09-27 19:13', member: 9 },
        //   { name: '大刚', date: '10-27 20:13', member: 10 },
        //   { name: '大王', date: '11-27 21:13', member: 11 }
        // ]
      })
    }
  }
})