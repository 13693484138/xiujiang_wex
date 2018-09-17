// pages/order/submitted/submitted.js
const http = require('../../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: {},
    showModal: false,
    first: true,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
    orderno: '',
    reason: '需要重新修改订单信息',
    disable: ''
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
  alertTips: function() {
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
  changeDuiClass: function(event) {
    var str = event.currentTarget.dataset.json;
    var reason = event.currentTarget.dataset.reason;
    if(reason) {
      this.setData({
        reason: reason
      })
    }else {
      this.setData({
        reason: ''
      })
    }
    console.log(this.data.reason);
    var flag = this.data[str];
    
    if (str == 'first') {
      if(!this.data.first) {
        this.setData({
          first: !this.data.first,
          second: false,
          third: false,
          fourth: false,
          fifth: false,
          sixth: false,
          disable: false
        })
      }else {
        this.setData({
          first: !this.data.first
        })
      }
    } else if (str == 'second') {
      if(!this.data.second) {
        this.setData({
          second: !this.data.second,
          first: false,
          third: false,
          fourth: false,
          fifth: false,
          sixth: false,
          disable: false
        })
      }else {
        this.setData({
          second: !this.data.second
        })
      }
    } else if (str == 'third') {
      if(!this.data.third) {
        this.setData({
          third: !this.data.third,
          first: false,
          second: false,
          fourth: false,
          fifth: false,
          sixth: false,
          disable: false
        })
      }else {
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
          sixth: false,
          disable: false
        })
      }else {
        this.setData({
          fourth: !this.data.fourth
        })
      }
    } else if (str == 'fifth') {
      if(!this.data.fifth) {
        this.setData({
          fifth: !this.data.fifth,
          firth: false,
          second: false,
          third: false,
          fourth: false,
          sixth: false,
          disable: false
        })
      }else {
        this.setData({
          fifth: !this.data.fifth
        })
      }
    } else if (str == 'sixth') {
      if(!this.data.sixth) {
        this.setData({
          sixth: !this.data.sixth,
          first: false,
          second: false,
          third: false,
          fourth: false,
          fifth: false,
          disable: true
        })
      }else {
        this.setData({
          sixth: !this.data.sixth,
          disable: false
        })
      }
    }
  },
  getReason: function(event) {
    this.setData({
      reason: event.detail.value
    })
  },
  cancelOrder: function() {
    http.request({
      apiName: 'order/cancelorder',
      method: 'put',
      data: {orderno: this.data.orderno, reason: this.data.reason},
      success: function(res) {
        wx.showToast({
          title: res.data,
          icon: 'success',
          duration: 2000
        });
        this.setData({
          showModal: false
        })
      }
    })
  }
})

function getOrderDetail(me, orderno, state) {
  http.request({
    apiName: 'order/orderdetail',
    method: 'POST',
    data: {orderno: orderno, status: state},
    success: function(res) {
      console.log(res);
      me.setData({
        orderDetail: res
      })
    }
  })
}