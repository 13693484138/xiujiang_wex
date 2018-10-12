// pages/me/me.js
const http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTop: false,
    showModal: false,
    level: '',
    pages: '申请分销',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   

   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    http.request({
      apiName: 'my/getmyinfo',
      method: 'GET',
      success: function (res) {
        console.log(res.level)
        if (res.level !== '0' || res.level !== '') {
          that.setData({
            pages: '分销中心'
          })
        } 
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  goToAddressManage: function() {
    wx.navigateTo({
      url: '/pages/me/address-manage/address-manage'
    })
  },
  goToApplyDistribution: function(event) {
    if (event.currentTarget.id == 'view1') {
      wx.navigateTo({
        url: '/pages/me/apply-distribution/apply-distribution-01/apply-distribution-01?id=' + 1
      })
    } else if (event.currentTarget.id == 'view4') {
      wx.navigateTo({
        url: '/pages/me/apply-distribution/apply-distribution-01/apply-distribution-01?id=' + 3
      })
    }else {
      if (event.currentTarget.id == 'view2'){
        wx.navigateTo({
          url: '/pages/me/apply-distribution/apply-distribution-01/apply-distribution-01?id=' + 2 + '&pid=' + 2
        })
      }
      if (event.currentTarget.id == 'view3') {
        wx.navigateTo({
          url: '/pages/me/apply-distribution/apply-distribution-01/apply-distribution-01?id=' + 2 + '&pid=' + 7
        })
      }
    }
  },
  goToSetting: function() {
    wx.navigateTo({
      url: '/pages/me/setting/setting'
    })
  },
  goToHelpCenter: function() {
    wx.navigateTo({
      url: '/pages/me/help-center/help-center'
    })
  },

  alertTips: function() {
    if(this.data.pages == '申请分销'){
      this.setData({
        showModal: true
      })
    }else{
      wx.navigateTo({
        url: '/pages/me/become-distributor/distribution-center/distribution-center',
      })
    }
  },


  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  preventTouchMove: function() {},
  changeDuiClass: function(event) {
    var str = event.currentTarget.dataset.json;
    var flag = this.data[str];
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