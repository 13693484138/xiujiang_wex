// pages/repair/fault-choose/repair-content/repair-content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first: false,
    second: false,
    showMore: false,
    showModel: false,
    price: 0,
    price1: 260,
    price2: 300,
    colors: []
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
  goToConfirmOrder: function() {
    wx.navigateTo({
      url: '/pages/repair/fault-choose/repair-content/confirm-order/confirm-order'
    })
  },
  goToRepairExplain: function() {
    wx.navigateTo({
      url: '/pages/repair/fault-choose/repair-content/repair-explain/repair-explain'
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
  showMore: function() {
    this.setData({
      showMore: !this.data.showMore
    })
  },
  changeDuiClass: function (event) {
    var str = event.currentTarget.dataset.json;
    var flag = this.data[str];
  
    if (str == 'first') {
      if (!this.data.first) {
        this.setData({
          first: !this.data.first,
          second: false,
          price: this.data.price1
        })
      } else {
        this.setData({
          first: !this.data.first
        })
      }
    } else if (str == 'second') {
      if (!this.data.second) {
        this.setData({
          second: !this.data.second,
          first: false,
          price: this.data.price2
        })
      } else {
        this.setData({
          second: !this.data.second
        })
      }
    } 

    if (!this.data.first && !this.data.second) {
      this.setData({
        price: 0
      })
    }

  }
})