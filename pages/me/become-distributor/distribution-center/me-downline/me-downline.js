// pages/me/become-distributor/distribution-center/me-downline/me-downline.js
const http = require('../../../../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindClass: true,
    lists: '',
    listA: '',
    listB: '',
    classA: 1,
    classB: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {   
    if(this.data.bindClass) {
      var that = this;
      http.request({
        apiName: 'my/subordinatelist',
        method: 'POST',
        data: {
          currentPage: that.data.classA
        },
        success: function (res) {
          console.log(res)
          that.setData({
            lists: res.list
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }else{
      var that = this;
      http.request({
        apiName: 'my/secondsubordinatelist',
        method: 'POST',
        data: {
          currentPage: that.data.classB
        },
        success: function (res) {
          that.setData({
            lists: res.list
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
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
      })
      return;
    }
    if (id == 2 && this.data.bindClass) {
      this.setData({
        bindClass: !this.data.bindClass,
      })
    }
  }
})