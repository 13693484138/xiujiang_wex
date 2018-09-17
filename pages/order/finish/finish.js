// pages/order/finish/finish.js
const http = require('../../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    showModal: false,
    orderno: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderno: options.id
    })
    getOrderDetail(this, options.id, options.state);
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
  },
  goToComment: function() {
    wx.navigateTo({
      url: '/pages/order/comment/comment?id='+this.data.orderno
    })
  },
  preventTouchMove: function () {
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
  changeDuiClass: function (event) {
    var str = event.currentTarget.dataset.json;
    var flag = this.data[str];
    console.log(flag);
    if (str == 'first') {
      if (!this.data.first) {
        this.setData({
          first: !this.data.first,
          second: false,
          third: false,
          fourth: false,
          fifth: false,
          sixth: false
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
          third: false,
          fourth: false,
          fifth: false,
          sixth: false
        })
      } else {
        this.setData({
          second: !this.data.second
        })
      }
    } else if (str == 'third') {
      if (!this.data.third) {
        this.setData({
          third: !this.data.third,
          first: false,
          second: false,
          fourth: false,
          fifth: false,
          sixth: false
        })
      } else {
        this.setData({
          third: !this.data.third
        })
      }
    } else if (str == 'fourth') {
      if (!this.data.fourth) {
        this.setData({
          fourth: !this.data.fourth,
          first: false,
          second: false,
          third: false,
          fifth: false,
          sixth: false
        })
      } else {
        this.setData({
          fourth: !this.data.fourth
        })
      }
    } else if (str == 'fifth') {
      if (!this.data.fifth) {
        this.setData({
          fifth: !this.data.fifth,
          firth: false,
          second: false,
          third: false,
          fourth: false,
          sixth: false
        })
      } else {
        this.setData({
          fifth: !this.data.fifth
        })
      }
    } else if (str == 'sixth') {
      if (!this.data.sixth) {
        this.setData({
          sixth: !this.data.sixth,
          first: false,
          second: false,
          third: false,
          fourth: false,
          fifth: false
        })
      } else {
        this.setData({
          sixth: !this.data.sixth
        })
      }
    }
  }
})


function getOrderDetail(me, orderno, state) {
  console.log(orderno+'---'+state);
  http.request({
    apiName: 'order/orderdetail',
    method: 'POST',
    data: { orderno: orderno, status: state },
    success: function (res) {
      me.setData({
        order: res
      });
      console.log(me.data.order);
    },
    fail: function(res) {
      console.log(res);
    }
  })
}