// pages/repair/fault-choose/repair-content/confirm-order/confirm-order.js
var util = require('../../../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTop: true,
    showModal: false,
    radioData: 1,
    dates: [],
    showDate: false,
    today: '',
    tomorrow: '',
    chooseRadio: '',
    comeTime: [],
    alertDateRadio: '',
    date: '',
    time: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dates: this.getDates()
    });
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
  goToAddAddress: function () {
    wx.navigateTo({
      url: '/pages/repair/fault-choose/repair-content/confirm-order/choose-address/choose-address'
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
  radioChange: function(event) {
    this.setData({
      radioData: event.detail.value
    })
  },
  goToRecommendShop: function() {
    wx.navigateTo({
      url: '/pages/repair/fault-choose/repair-content/confirm-order/recommend-shop/recommend-shop'
    })
  },

  getDates: function() {
    var date = new Date();
    var datess = [];
    var todate = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    for (var i = 0; i < 7; i++) {
      
      var date = util.dateLater(todate, i);
      if (i == 0) {
        this.setData({
          today: date.newdates,
        })
      }
      if(i == 1) {
        this.setData({
          tomorrow: date.newdates,
          chooseRadio: this.data.today
        })
      }
      var datejson = { date: date.newdates, week: date.week, dates: date.dates };
      datess.push(datejson);
    }
    return datess;
  },

  hideModal1: function () {
    this.setData({
      showDate: false
    });
  },
  chooseDate: function() {
    this.setData({
      showDate: true
    })
  },
  clickRadio: function(event) {
    var date = event.detail.value;
    this.setData({
      chooseRadio: date
    });
    if(date != this.data.today) {
      this.setData({
        comeTime: [
          {date: '10:00'},
          { date: '10:30' },
          { date: '11:00' },
          { date: '11:30' },
          { date: '13:00' },
          { date: '13:30' },
          { date: '14:00' },
          { date: '14:30' },
          { date: '15:00' },
          { date: '15:30' },
          { date: '16:00' },
          { date: '16:30' },
        ]
      })
    
    }else {
      this.setData({
        comeTime: []
      })
    }
  for (var item of this.data.dates) {
    if(date == item.date) {
      this.setData({
        date: item.dates.replace(/0/g,'')+' '+item.week+' '
      });
      break;
    }
  }
  },
  alertDateRadio: function(event) {
    var date = event.detail.value;
    this.setData({
      alertDateRadio: date,
      time: this.data.date+date
    })
  }
})