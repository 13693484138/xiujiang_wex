// pages/me/become-distributor/distribution-center/me-downline/me-downline.js
const http = require('../../../../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindClass: true,
    lists: '',
    listOne: '',
    listTwo: '',
    currentPage: 2,
    totalResult: '',
    totalResult1: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (this.data.bindClass) {
      http.request({
        apiName: 'my/subordinatelist',
        method: 'POST',
        data: {
          currentPage: that.data.currentPage
        },
        success: function (res) {
          console.log(res)
          that.setData({
            listOne: res.list,
            lists: res.list,
            totalResult: res.totalResult
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }
    http.request({
      apiName: 'my/secondsubordinatelist',
      method: 'POST',
      data: {
        currentPage: that.data.currentPage
      },
      success: function (res) {
        that.setData({
          listTwo: res.list,
          totalResult1: res.totalResult
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    
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

  changeClass: function (event) {
    var id = event.currentTarget.dataset.id;
    if (id == 1 && !this.data.bindClass) {
      this.setData({
        bindClass: !this.data.bindClass,
        lists: this.data.listOne
      })
      return;
    }
    if (id == 2 && this.data.bindClass) {
      this.setData({
        bindClass: !this.data.bindClass,
        lists: this.data.listTwo
      })
    }
  }
})